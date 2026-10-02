import PermissionActions from '@/components/permissions/permission-actions';

export default function PermissionTable({ permissions }: { permissions: any }) {
    return (
        <div className="rounded-xl border">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Guard</th>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {permissions.map((permission: any) => (
                        <tr key={permission.id}>
                            <td className={'text-center'}>{permission.name}</td>

                            <td className={'text-center'}>
                                {permission.guard_name}
                            </td>

                            <td className={'text-center'}>
                                {permission.roles_count}
                            </td>

                            <td className={''}>
                                <div className={'items-center'}>
                                    <PermissionActions
                                        permission={permission}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
