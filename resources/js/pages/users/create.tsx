import { Permission, Role, UserErrors } from '@/types';
import users from '@/routes/users';
import UserForm from '@/pages/users/partials/user-form';
import { UserPlus } from 'lucide-react';
import {CreatePage} from "@/components/ui/pages/CreatePage";

type CreateProps = {
    permissions: Permission[];
    roles: Role[];
    errors: UserErrors;
};

export default function Create({ permissions, roles, errors }: CreateProps) {
    return (
        <CreatePage title='Create user' icon={<UserPlus/>}>
            <UserForm
                permissions={permissions}
                roles={roles}
                user={undefined}
                dataErrors={errors}
            />
        </CreatePage>
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
