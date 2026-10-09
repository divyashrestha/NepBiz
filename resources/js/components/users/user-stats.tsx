import { UserCustomStats } from '@/types';

type UserStatsProps = { stats: UserCustomStats };

export default function UserStats({ stats }: UserStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-5">
                <h3>Total Users</h3>

                <p className="text-3xl font-bold">{stats.users_count}</p>
            </div>

            <div className="rounded-xl border p-5">
                <h3>Total Roles</h3>

                <p className="text-3xl font-bold">{stats.roles_count}</p>
            </div>
        </div>
    );
}
