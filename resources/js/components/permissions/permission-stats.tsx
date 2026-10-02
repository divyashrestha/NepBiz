import {Permission} from "@/types";

export default function PermissionStats({permissions}: { permissions: Permission[] }) {
    console.log('PermissionStats', permissions)
    return (
        <div className="grid gap-4 md:grid-cols-3">

            <div className="border rounded-xl p-5">
                <h3>Total Permissions</h3>

                <p className="text-3xl font-bold">
                    {permissions.length}
                </p>
            </div>

            <div className="border rounded-xl p-5">
                <h3>Assigned</h3>

                <p className="text-3xl font-bold">
                    {permissions.filter((p: Permission) => p.roles_count > 0).length}
                </p>
            </div>

            <div className="border rounded-xl p-5">
                <h3>Unused</h3>

                <p className="text-3xl font-bold">
                    {permissions.filter((p: Permission) => p.roles_count === 0).length}
                </p>
            </div>

        </div>
    );
}
