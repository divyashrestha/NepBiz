import RoleForm from './partials/role-form';
import { Head } from '@inertiajs/react';
import roles from '@/routes/roles';
import { Permission } from '@/types';

type CreateProps = { permissions: Permission[] };

export default function Create({ permissions }: CreateProps) {
    return (
        <>
            <Head title="Create roles" />
            <RoleForm permissions={permissions} role={undefined} />;
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Create Role',
            href: roles.create,
        },
    ],
};
