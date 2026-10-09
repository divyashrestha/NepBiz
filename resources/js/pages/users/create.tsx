import { Head } from '@inertiajs/react';
import { Permission, Role, UserErrors } from '@/types';
import users from '@/routes/users';
import UserForm from '@/pages/users/partials/user-form';

type CreateProps = {
    permissions: Permission[];
    roles: Role[];
    errors: UserErrors;
};

export default function Create({ permissions, roles, errors }: CreateProps) {
    return (
        <>
            <Head title="Create user" />
            <UserForm
                permissions={permissions}
                roles={roles}
                user={undefined}
                dataErrors={errors}
            />
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Create User',
            href: users.create,
        },
    ],
};
