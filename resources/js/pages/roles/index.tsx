import RoleTable from './partials/role-table';
import { RoleIndex, CustomFilter, UsedUnusedStats } from '@/types';
import * as roleRoutes from '@/routes/roles';
import RoleStats from '@/components/roles/role-stats';
import CustomSearch from '@/components/custom-search';
import {IndexPage} from "@/components/ui/pages/IndexPage";
import {HtmlTag} from "@/components/ui/html-tag";

type RoleIndexProps = {
    roles: RoleIndex;
    filters: CustomFilter;
    stats: UsedUnusedStats;
};

export default function Index({ roles, filters, stats }: RoleIndexProps) {
    return (
        <IndexPage title="Roles">
            <HtmlTag.Div className="space-y-6 p-6">
                <HtmlTag.Div className="flex items-center justify-between">
                    <IndexPage.Header>Roles</IndexPage.Header>
                    <IndexPage.CreateButton url={roleRoutes.create().url}>
                        Add Role
                    </IndexPage.CreateButton>
                </HtmlTag.Div>

                <RoleStats stats={stats} />

                <CustomSearch
                    url={roleRoutes.index().url}
                    placeholder="Search roles..."
                    search={filters.search}
                />

                <RoleTable roles={roles} />
            </HtmlTag.Div>
        </IndexPage>
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
