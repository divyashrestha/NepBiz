import PermissionTable from './partials/permission-table';
import PermissionStats from '@/components/permissions/permission-stats';
import PermissionSearch from '@/components/permissions/permission-search';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { KeyRound, Plus } from 'lucide-react';
import * as permissionRoutes from '@/routes/permissions';
import { PermissionIndex } from '@/types';

export default function Index({
    permissions,
}: {
    permissions: PermissionIndex;
}) {
    return (
        <>
            <Head title="Permissions" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <KeyRound />
                        <h1 className="text-3xl font-bold">Permissions</h1>
                    </div>

                    <Link href={permissionRoutes.create()}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Permission
                        </Button>
                    </Link>
                </div>

                <PermissionStats permissions={permissions.data} />

                <PermissionSearch />

                <PermissionTable permissions={permissions.data} />
            </div>
        </>
    );
}
Index.layout = {
    breadcrumbs: [
        {
            title: 'Permissions',
            href: permissionRoutes.index,
        },
    ],
};
