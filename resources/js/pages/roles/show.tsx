import { Permission } from '@/types';

export default function Show({ role }: { role: any }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{role.name}</h1>

            <div className="mt-6">
                <h2>Permissions</h2>

                <div className="mt-3 flex flex-wrap gap-2">
                    {role.permissions.map((permission: Permission) => (
                        <span
                            key={permission.id}
                            className="rounded bg-primary px-3 py-1 text-primary-foreground"
                        >
                            {permission.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
