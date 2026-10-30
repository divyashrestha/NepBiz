import RoleForm from './partials/role-form';
import roles from '@/routes/roles';
import {Permission, RoleErrors} from '@/types';
import { User2 } from 'lucide-react';
import {CreatePage} from "@/components/ui/pages/CreatePage";

type CreateProps = { permissions: Permission[], errors: RoleErrors };

export default function Create({ permissions, errors }: CreateProps) {
    return (
        <CreatePage title="Create role" icon={<User2 />}>
            <RoleForm permissions={permissions} role={undefined} dataErrors={errors} />;
        </CreatePage>
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
