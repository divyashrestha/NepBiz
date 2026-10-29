import RoleForm from './partials/role-form';
import { Head } from '@inertiajs/react';
import roles from '@/routes/roles';
import {Permission, RoleErrors} from '@/types';

type CreateProps = { permissions: Permission[], errors: RoleErrors };

export default function Create({ permissions, errors }: CreateProps) {
    return (
        <>
            <Head title="Create roles" />
            <RoleForm permissions={permissions} role={undefined} dataErrors={errors} />;
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
