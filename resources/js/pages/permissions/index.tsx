import PermissionTable from './partials/permission-table';
import * as permissionRoutes from '@/routes/permissions';
import { CustomFilter, PermissionIndex, UsedUnusedStats } from '@/types';
import CustomSearch from '@/components/custom-search';
import {IndexPage} from "@/components/ui/pages/IndexPage";
import {HtmlTag} from "@/components/ui/html-tag";

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
    const statsData= [
        {name: 'Total Permission', value: stats.used +stats.unused},
        {name: 'Assigned', value: stats.used},
        {name: 'Unassigned', value: stats.unused},
    ];

    return (
        <IndexPage title="Permissions">
            <HtmlTag.Div className="space-y-6 p-6">
                <HtmlTag.Div className="flex items-center justify-between">
                    <IndexPage.Header>Permissions</IndexPage.Header>

                    <IndexPage.CreateButton perform={'permissions'} url={permissionRoutes.create().url}>
                        Add Permission
                    </IndexPage.CreateButton>
                </HtmlTag.Div>

                <IndexPage.Stats gaps={4} data={statsData} gridCols={3} />

                <CustomSearch
                    placeholder="Search permissions..."
                    search={filters.search}
                    url={permissionRoutes.index().url}
                />

                <PermissionTable permissions={permissions} />
            </HtmlTag.Div>
        </IndexPage>
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
