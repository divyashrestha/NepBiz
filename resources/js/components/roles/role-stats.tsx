import { UsedUnusedStats } from '@/types';

type RoleStatsProps = { stats: UsedUnusedStats };

export default function RoleStats({ stats }: RoleStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
                <h3>Total Roles</h3>

                <p className="text-3xl font-bold">
                    {stats.used + stats.unused}
                </p>
            </div>

            <div className="rounded-xl border p-5">
                <h3>Assigned</h3>

                <p className="text-3xl font-bold">{stats.used}</p>
            </div>

            <div className="rounded-xl border p-5">
                <h3>Unused</h3>

                <p className="text-3xl font-bold">{stats.unused}</p>
            </div>
        </div>
    );
}
