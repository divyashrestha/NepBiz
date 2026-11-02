import { UserCustomStats, UserFilter, UserIndex } from '@/types';
import * as userRoutes from '@/routes/users';
import UserTable from '@/pages/users/partials/user-table';
import CustomSearch from '@/components/custom-search';
import {IndexPage} from "@/components/ui/pages/IndexPage";
import {HtmlTag} from "@/components/ui/html-tag";

type UserIndexProps = {
    users: UserIndex;
    filters: UserFilter;
    stats: UserCustomStats;
};

export default function Index({ users, filters, stats }: UserIndexProps) {
    const statsData= [
        {name: 'Total Users', value: stats.users_count},
        {name: 'Total Roles', value: stats.roles_count},
    ];

    return (
        <IndexPage title="Users">
            <HtmlTag.Div className="space-y-6 p-6">
                <HtmlTag.Div className="flex items-center justify-between">
                    <IndexPage.Header>Users</IndexPage.Header>

                    <IndexPage.CreateButton perform='users' url={userRoutes.create().url}>
                        Add User
                    </IndexPage.CreateButton>
                </HtmlTag.Div>

                <IndexPage.Stats gaps={4} data={statsData} gridCols={2} />

                <CustomSearch
                    url={userRoutes.index().url}
                    placeholder="Search users..."
                    search={filters.search}
                />

                <UserTable users={users} />
            </HtmlTag.Div>
        </IndexPage>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: userRoutes.index(),
        },
    ],
};
