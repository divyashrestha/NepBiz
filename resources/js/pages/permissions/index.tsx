import PermissionTable from './partials/permission-table';
import PermissionStats from '@/components/permissions/permission-stats';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { KeyRound, Plus } from 'lucide-react';
import * as permissionRoutes from '@/routes/permissions';
import { CustomFilter, PermissionIndex, UsedUnusedStats } from '@/types';
import CustomSearch from '@/components/custom-search';

type IndexPermissionProps = {
    permissions: PermissionIndex;
    filters: CustomFilter;
    stats: UsedUnusedStats;
};

export default function Index({
    permissions,
    filters,
    stats,
}: IndexPermissionProps) {
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

                <PermissionStats stats={stats} />

                <CustomSearch
                    placeholder="Search permissions..."
                    search={filters.search}
                    url={permissionRoutes.index().url}
                />

                <PermissionTable permissions={permissions} />
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
