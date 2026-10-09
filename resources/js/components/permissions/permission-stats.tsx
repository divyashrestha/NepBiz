import { UsedUnusedStats } from '@/types';

type PermissionStatsProps = { stats: UsedUnusedStats };

export default function PermissionStats({ stats }: PermissionStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
                <h3>Total Permissions</h3>

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
