import PermissionForm from './partials/permission-form';
import { KeyRound } from 'lucide-react';
import {Permission, PermissionErrors} from '@/types';
import permissions from '@/routes/permissions';
import {EditPage} from "@/components/ui/pages/EditPage";

type EditProps = { permission: Permission, errors: PermissionErrors };

export default function Edit({ permission, errors }: EditProps) {
    return (
        <EditPage title="Edit permission" icon={<KeyRound />}>
            <PermissionForm permission={permission} dataErrors={errors} />
        </EditPage>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Edit Permission',
            href: permissions.edit,
        },
    ],
};
