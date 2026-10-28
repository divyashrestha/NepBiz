import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import permissions from '@/routes/permissions';
import { Permission, PermissionErrors } from '@/types';
import { CustomChangeEvent, CustomSubmitEvent } from '@/types/custom';
import { FormRow } from '@/components/ui/form/index.';
import { useState } from 'react';
import { AuthorizedLink } from '@/components/ui/authorized-link';

type PermissionFormProps = {
    dataErrors: PermissionErrors;
    permission: Permission | null;
};

export default function PermissionForm({
    dataErrors,
    permission,
}: PermissionFormProps) {
    console.log(dataErrors);
    const { data, setData, post, put, processing } = useForm({
        name: permission?.name ?? '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({
        name: dataErrors?.name ?? '',
    });

    const handleFieldChange = (key: string, value: string) => {
        setData(key as any, value);

        // Clear out active validation flags instantly as the user types a correction
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: '' }));
        }
    };

    const submit = (e: CustomSubmitEvent) => {
        e.preventDefault();

        if (permission) {
            put(permissions.update(permission?.id).url);
            return;
        }

        post(permissions.index().url);
    };

    return (
        <form onSubmit={submit} className="max-w-xl space-y-4">
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
            <div className="flex justify-end pt-4">
                <Button disabled={processing}>
                    {permission ? 'Update' : 'Create'}
                </Button>
                <AuthorizedLink
                    perform="permissions.view"
                    href={permissions.index()}
                    className={'btn mx-2'}
                >
                    Back
                </AuthorizedLink>
            </div>
        </form>
    );
}
