import { Permission, Role, User } from '@/types';
import roles from '@/routes/roles';
import { Head, Link } from '@inertiajs/react';
import users from '@/routes/users';

type ShowProps = { user: User & { permissions: Permission[]; roles: Role[] } };

export default function Show({ user }: ShowProps) {
    return (
        <>
            <Head title={'Show user'}></Head>
            <div className="p-6">
                <h1 className="text-2xl font-bold">{user.name}</h1>

                <div className="mt-6">
                    <h2>Email</h2>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {user.email}
                    </div>
                </div>
                <div className="mt-6">
                    <h2>Permissions</h2>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {user.permissions.map((permission: Permission) => (
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
                    <h2>Roles</h2>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {user.roles.map((role: Role) => (
                            <span
                                key={role.id}
                                className="rounded bg-primary px-3 py-1 text-primary-foreground"
                            >
                                {role.name}
                            </span>
                        ))}
                    </div>
                </div>

                <Link href={users.index()} className={'btn mx-2'}>
                    Back
                </Link>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Show User',
            href: roles.show,
        },
    ],
};
