import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Permission, RoleWithPermissionsUsers } from '@/types';
import roles from '@/routes/roles';
import { CustomChangeEvent, CustomSubmitEvent } from '@/types/custom';

type RoleFormProps = { role: RoleWithPermissionsUsers | undefined; permissions: Permission[]; }

export default function RoleForm({role, permissions,}: RoleFormProps) {
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

    return (
        <form onSubmit={submit} className="space-y-6 p-6">
            <Input
                value={data.name}
                placeholder="Role Name"
                onChange={(e: CustomChangeEvent) =>
                    setData('name', e.target.value)
                }
            />

            <div className="grid gap-4 md:grid-cols-3">
                {permissions.map((permission) => (
                    <label key={permission.id} className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={data.permissions.includes(permission.id)}
                            onChange={(e: CustomChangeEvent) => {
                                if (e.target.checked) {
                                    setData('permissions', [
                                        ...data.permissions,
                                        permission.id,
                                    ]);
                                } else {
                                    setData(
                                        'permissions',
                                        data.permissions.filter(
                                            (id) => id !== permission.id,
                                        ),
                                    );
                                }
                            }}
                        />
                        {permission.name}
                    </label>
                ))}
            </div>

            <Button>{role ? 'Update Role' : 'Create Role'}</Button>
            <Link href={roles.index()} className={'btn mx-2'}>
                Back
            </Link>
        </form>
    );
}
