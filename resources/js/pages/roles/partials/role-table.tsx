import RoleActions from '@/components/roles/role-actions';
import { RoleIndex, RoleWithCounts } from '@/types';
import Pagination from '@/components/pagination';

type RoleTableProps = { roles: RoleIndex };

export default function RoleTable({ roles }: RoleTableProps) {
    return (
        <div className="rounded-xl border">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Permissions</th>
                        <th>Users</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.data.length == 0 ? (
                        <tr>
                            <td className={'text-center'} colSpan={4}>
                                {' '}
                                No roles found
                            </td>
                        </tr>
                    ) : (
                        roles.data.map((role: RoleWithCounts) => (
                            <tr key={role.id}>
                                <td className={'text-center'}>{role.name}</td>

                                <td className={'text-center'}>
                                    {role.permissions_count}
                                </td>

                                <td className={'text-center'}>
                                    {role.users_count}
                                </td>

                                <td>
                                    <RoleActions role={role} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination links={roles.links} />
        </div>
    );
}
