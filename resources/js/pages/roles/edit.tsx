import RoleForm from './partials/role-form';
import {Permission, RoleErrors, RoleWithPermissionsUsers} from '@/types';
import roles from '@/routes/roles';
import {Shield} from "lucide-react";
import {EditPage} from "@/components/ui/pages/EditPage";

type EditProps = {
    role: RoleWithPermissionsUsers;
    permissions: Permission[];
    errors: RoleErrors;
};

export default function Edit({ role, permissions, errors }: EditProps) {
    return (
        <EditPage title='Edit role' icon={<Shield />}>
            <RoleForm role={role} permissions={permissions} dataErrors={errors} />
        </EditPage>
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
