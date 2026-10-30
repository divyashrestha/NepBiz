import users from '@/routes/users';
import { Permission, Role, User, UserErrors } from '@/types';
import {UserRoundPen} from "lucide-react";
import {EditPage} from "@/components/ui/pages/EditPage";
import UserForm from '@/pages/users/partials/user-form';

type EditProps = {
    user: User & { permissions: Permission[]; roles: Role[] };
    permissions: Permission[];
    roles: Role[];
    errors: UserErrors;
};

export default function Edit({ user, roles, permissions, errors }: EditProps) {
    return (
        <EditPage title='Edit user' icon={<UserRoundPen />} >
            <UserForm
                user={user}
                dataErrors={errors}
                permissions={permissions}
                roles={roles}
            />
        </EditPage>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Edit user',
            href: users.edit,
        },
    ],
};
