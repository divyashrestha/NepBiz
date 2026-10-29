import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {CheckboxOption, Permission, RoleErrors, RoleWithPermissionsUsers} from '@/types';
import roles from '@/routes/roles';
import { CustomChangeEvent, CustomSubmitEvent } from '@/types/custom';
import {Form, FormRow} from '@/components/ui/form/index.';
import { AuthorizedLink } from '@/components/ui/authorized-link';
import {useEffect, useState} from "react";

type RoleFormProps = {
    role: RoleWithPermissionsUsers | undefined;
    permissions: Permission[];
    dataErrors: RoleErrors;
};

export default function RoleForm({ role, permissions, dataErrors }: RoleFormProps) {
    const { data, setData, post, put } = useForm({
        name: role?.name ?? '',
        permissions: role?.permissions?.map((p) => p.id) ?? [],
    });

    // Initialise validation errors
    const [errors, setErrors] = useState<Record<string, string>>({
        name: dataErrors?.name ?? '',
        permissions: dataErrors?.permissions ?? '',
    });

    useEffect(() => {
        if (dataErrors && Object.keys(dataErrors).length > 0) {
            setErrors(dataErrors as unknown as Record<string, string>);
        }
    }, [dataErrors]);


    const submit = (e: CustomSubmitEvent) => {
        e.preventDefault();

        if (role) {
            put(roles.update(role.id).url);
            return;
        }

        post(roles.index().url);
    };

    const setPermissions = (
        permission: CheckboxOption,
        e: CustomChangeEvent,
    ) => {
        const permissionId = Number(permission.id);
        const isChecked = e.target.checked;

        setData((prev) => {
            const updatedPermissions = isChecked
                ? [...prev.permissions, permissionId]
                : prev.permissions.filter((id) => id !== permissionId);

            return { ...prev, permissions: updatedPermissions };
        });
    };

    const handleFieldChange = (key: string, value: string) => {
        setData(key as any, value);

        // Clear out active validation flags instantly as the user types a correction
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: '' }));
        }
    };

    // @ts-ignore
    return (
        <Form name="role" onSubmit={submit}>
            <FormRow error={errors.name} id="name">
                <FormRow.Label>Name</FormRow.Label>
                <FormRow.Input
                    type="text"
                    value={data.name}
                    placeholder="Enter full name"
                    onChange={(e: CustomChangeEvent) =>
                        handleFieldChange('name', e.target.value)
                    }
                />
            </FormRow>

            <FormRow error={errors.permissions} id="permissions">
                <FormRow.Label>Permissions</FormRow.Label>
                <FormRow.CheckboxGroup
                    options={permissions}
                    selectedValues={data.permissions}
                    onChange={setPermissions}
                />
            </FormRow>

            <div className="flex justify-end pt-4">
                <Button>{role ? 'Update Role' : 'Create Role'}</Button>
                <AuthorizedLink
                    perform="roles.view"
                    href={roles.index()}
                    className={'btn mx-2'}
                >
                    Back
                </AuthorizedLink>
            </div>
        </Form>
    );
}
