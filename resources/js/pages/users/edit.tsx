import UserForm from '@/pages/users/partials/user-form';
import { Head } from '@inertiajs/react';
import users from '@/routes/users';
import { Permission, Role, User, UserErrors } from '@/types';

type EditProps = {
    user: User & { permissions: Permission[]; roles: Role[] };
    permissions: Permission[];
    roles: Role[];
    errors: UserErrors;
};

export default function Edit({ user, roles, permissions, errors }: EditProps) {
    return (
        <>
            <Head title={'Edit user'}></Head>
            <UserForm
                user={user}
                dataErrors={errors}
                permissions={permissions}
                roles={roles}
            />
        </>
    );
}

Edit.layout = {
    breadcrumbs: {
        title: 'Edit user',
        href: users.show,
    },
};
