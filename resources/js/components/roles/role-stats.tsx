import { RoleWithCounts } from '@/types';

export default function RoleStats({ roles }: { roles: RoleWithCounts[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
                <h3>Total Roles</h3>

                <p className="text-3xl font-bold">{roles.length}</p>
            </div>

            <div className="rounded-xl border p-5">
                <h3>Assigned</h3>

                <p className="text-3xl font-bold">
                    {
                        roles.filter((r: RoleWithCounts) => r?.users_count > 0)
                            .length
                    }
                </p>
            </div>

            <div className="rounded-xl border p-5">
                <h3>Unused</h3>

                <p className="text-3xl font-bold">
                    {
                        roles.filter((r: RoleWithCounts) => r.users_count === 0)
                            .length
                    }
                </p>
            </div>
        </div>
    );
}
