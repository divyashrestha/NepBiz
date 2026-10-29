import { Head } from '@inertiajs/react';
import { UserCustomStats, UserFilter, UserIndex } from '@/types';
import * as userRoutes from '@/routes/users';
import UserTable from '@/pages/users/partials/user-table';
import CustomSearch from '@/components/custom-search';
import UserStats from '@/components/users/user-stats';
import { IndexCreateButton, IndexTitle } from '@/components/ui/index';

type UserIndexProps = {
    users: UserIndex;
    filters: UserFilter;
    stats: UserCustomStats;
};

export default function Index({ users, filters, stats }: UserIndexProps) {
    return (
        <>
            <Head title="Users" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <IndexTitle>Users</IndexTitle>

                    <IndexCreateButton url={userRoutes.create().url}>
                        Add User
                    </IndexCreateButton>
                </div>

                <UserStats stats={stats} />

                <CustomSearch
                    url={userRoutes.index().url}
                    placeholder="Search users..."
                    search={filters.search}
                />

                <UserTable users={users} />
            </div>
        </>
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
