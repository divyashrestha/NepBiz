import { Head, Link } from '@inertiajs/react';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserCustomStats, UserFilter, UserIndex } from '@/types';
import * as userRoutes from '@/routes/users';
import UserTable from '@/pages/users/partials/user-table';
import CustomSearch from '@/components/custom-search';
import UserStats from '@/components/users/user-stats';

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
                    <div className="flex items-center gap-2">
                        <Shield />
                        <h1 className="text-3xl font-bold">Users</h1>
                    </div>

                    <Link href={userRoutes.create()}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </Link>
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
