import PermissionActions from '@/components/permissions/permission-actions';
import Pagination from '@/components/pagination';
import { PermissionIndex, PermissionWithRoleCount } from '@/types';

type PermissionProps = { permissions: PermissionIndex };

export default function PermissionTable({ permissions }: PermissionProps) {
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
                    {permissions.data.length == 0 ? (
                        <tr>
                            <td colSpan={4} className={'text-center'}>
                                No data found
                            </td>
                        </tr>
                    ) : (
                        permissions.data.map(
                            (permission: PermissionWithRoleCount) => (
                                <tr key={permission.id}>
                                    <td className={'text-center'}>
                                        {permission.name}
                                    </td>

                                    <td className={'text-center'}>
                                        {permission.guard_name}
                                    </td>

                                    <td className={'text-center'}>
                                        {permission.roles_count}
                                    </td>

                                    <td className="">
                                        <div className={'items-center'}>
                                            <PermissionActions
                                                permission={permission}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ),
                        )
                    )}
                </tbody>
            </table>
            <Pagination links={permissions.links} />
        </div>
    );
}
