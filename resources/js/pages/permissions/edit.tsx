import PermissionForm from './partials/permission-form';
import { KeyRound } from 'lucide-react';
import { Permission } from '@/types';
import { Head } from '@inertiajs/react';
import permissions from '@/routes/permissions';

type EditProps = { permission: Permission };

export default function Edit({ permission }: EditProps) {
    return (
        <>
            <Head title="Edit permission" />
            <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                    <KeyRound />
                    <h1 className="text-3xl font-bold">Edit Permission</h1>
                </div>
                <PermissionForm permission={permission} />
            </div>
        </>
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
