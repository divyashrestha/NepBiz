import { Head } from '@inertiajs/react';
import RoleTable from './partials/role-table';
import { RoleIndex, CustomFilter, UsedUnusedStats } from '@/types';
import * as roleRoutes from '@/routes/roles';
import RoleStats from '@/components/roles/role-stats';
import CustomSearch from '@/components/custom-search';
import { IndexCreateButton, IndexTitle } from '@/components/ui/index/';

type RoleIndexProps = {
    roles: RoleIndex;
    filters: CustomFilter;
    stats: UsedUnusedStats;
};

export default function Index({ roles, filters, stats }: RoleIndexProps) {
    return (
        <>
            <Head title="Roles" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <IndexTitle>Roles</IndexTitle>
                    <IndexCreateButton url={roleRoutes.create().url}>
                        Add Role
                    </IndexCreateButton>
                </div>

                <RoleStats stats={stats} />

                <CustomSearch
                    url={roleRoutes.index().url}
                    placeholder="Search roles..."
                    search={filters.search}
                />

                <RoleTable roles={roles} />
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: roleRoutes.index(),
        },
    ],
};
