import AppLayout from '@/layouts/app-layout';
import {Permission} from "@/types";

export default function Show({role,}: { role: any }) {
    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold">
                {role.name}
            </h1>

            <div className="mt-6">
                <h2>
                    Permissions
                </h2>

                <div className="flex flex-wrap gap-2 mt-3">
                    {role.permissions.map((permission: Permission) => (
                            <span key={permission.id} className="px-3 py-1 rounded bg-primary text-primary-foreground">
                                    {permission.name}
                            </span>
                        )
                    )}
                </div>
            </div>

        </div>

    );
}
