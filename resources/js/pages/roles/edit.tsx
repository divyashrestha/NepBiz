import RoleForm from './partials/role-form';
import { Permission, RoleWithPermissionsUsers } from '@/types';
import { Head } from '@inertiajs/react';
import roles from '@/routes/roles';

type EditProps = {
    role: RoleWithPermissionsUsers;
    permissions: Permission[];
};

export default function Edit({ role, permissions }: EditProps) {
    return (
        <>
            <Head title="Edit role" />
            <RoleForm role={role} permissions={permissions} />
        </>
    );
}
Edit.layout = {
    breadcrumbs: [
        {
            title: 'Edit Role',
            href: roles.edit,
        },
    ],
};
