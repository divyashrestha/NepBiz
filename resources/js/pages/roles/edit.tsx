import RoleForm from './partials/role-form';
import { Permission, RoleWithPermissionsUsers } from '@/types';
import { Head } from '@inertiajs/react';
import roles from '@/routes/roles';

export default function Edit({
    role,
    permissions,
}: {
    role: RoleWithPermissionsUsers;
    permissions: Permission[];
}) {
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
