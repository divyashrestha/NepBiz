import { Permission, RoleWithPermissionsUsers, User } from '@/types';
import { Head } from '@inertiajs/react';
import roles from '@/routes/roles';
import { AuthorizedLink } from '@/components/ui/authorized-link';

type ShowProps = { role: RoleWithPermissionsUsers };

export default function Show({ role }: ShowProps) {
    return (
        <>
            <Head title="Show roles" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">{role.name}</h1>

                <div className="mt-6">
                    <h2>Permissions</h2>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {role.permissions.map((permission: Permission) => (
                            <span
                                key={permission.id}
                                className="rounded bg-primary px-3 py-1 text-primary-foreground"
                            >
                                {permission.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h2>Users</h2>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {role.users.map((user: User) => (
                            <span
                                key={user.id}
                                className="rounded bg-primary px-3 py-1 text-primary-foreground"
                            >
                                {user.name}
                            </span>
                        ))}
                    </div>
                </div>

                <AuthorizedLink
                    href={roles.index()}
                    className={'btn mx-2'}
                    perform="roles.view"
                >
                    Back
                </AuthorizedLink>
            </div>
        </>
    );
}
Show.layout = {
    breadcrumbs: [
        {
            title: 'Show Role',
            href: roles.show,
        },
    ],
};
