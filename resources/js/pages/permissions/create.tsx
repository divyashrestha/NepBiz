import PermissionForm from './partials/permission-form';
import permissions from '@/routes/permissions';
import {PermissionErrors} from "@/types";
import {CreatePage} from "@/components/ui/pages/CreatePage";
import {KeyRound} from "lucide-react";

type CreateProps = { errors: PermissionErrors };

export default function Create({errors}:CreateProps) {
    return (
        <CreatePage title="Create permission" icon={<KeyRound />}>
            <PermissionForm permission={null} dataErrors={errors} />
        </CreatePage>
    );
}
Create.layout = {
    breadcrumbs: [
        {
            title: 'Create Permission',
            href: permissions.create,
        },
    ],
};
