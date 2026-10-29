import PermissionTable from './partials/permission-table';
import PermissionStats from '@/components/permissions/permission-stats';
import { Head } from '@inertiajs/react';
import * as permissionRoutes from '@/routes/permissions';
import { CustomFilter, PermissionIndex, UsedUnusedStats } from '@/types';
import CustomSearch from '@/components/custom-search';
import { IndexCreateButton, IndexTitle } from '@/components/ui/index/';

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
                    <IndexTitle>Permissions</IndexTitle>

                    <IndexCreateButton url={permissionRoutes.create().url}>
                        Add Permission
                    </IndexCreateButton>
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
