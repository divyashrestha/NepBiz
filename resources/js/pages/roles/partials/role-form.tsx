import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CheckboxOption, Permission, RoleWithPermissionsUsers } from '@/types';
import roles from '@/routes/roles';
import { CustomChangeEvent, CustomSubmitEvent } from '@/types/custom';
import { FormRow } from '@/components/ui/form/index.';

type RoleFormProps = {
    role: RoleWithPermissionsUsers | undefined;
    permissions: Permission[];
};

export default function RoleForm({ role, permissions }: RoleFormProps) {
    const { data, setData, post, put } = useForm({
        name: role?.name ?? '',
        permissions: role?.permissions?.map((p) => p.id) ?? [],
    });

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

    // @ts-ignore
    return (
        <form onSubmit={submit} className="space-y-6 p-6">
            <FormRow>
                <FormRow.Label>Full Name</FormRow.Label>
                <FormRow.Input
                    type="text"
                    value={data.name}
                    placeholder="Enter full name"
                    onChange={(e: CustomChangeEvent) =>
                        setData('name', e.target.value)
                    }
                />
            </FormRow>

            <FormRow>
                <FormRow.Label>Permissions</FormRow.Label>
                <FormRow.CheckboxGroup
                    options={permissions}
                    selectedValues={data.permissions}
                    onChange={setPermissions}
                />
            </FormRow>

            <div className="flex justify-end pt-4">
                <Button>{role ? 'Update Role' : 'Create Role'}</Button>
                <Link href={roles.index()} className={'btn mx-2'}>
                    Back
                </Link>
            </div>
        </form>
    );
}
