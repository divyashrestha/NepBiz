import PermissionForm from './partials/permission-form';
import { KeyRound } from 'lucide-react';
import { Head } from '@inertiajs/react';
import permissions from '@/routes/permissions';

export default function Create() {
    return (
        <>
            <Head title="Create permission" />
            <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                    <KeyRound />
                    <h1 className="text-3xl font-bold">Add Permission</h1>
                </div>
                <PermissionForm permission={null} />
            </div>
        </>
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
