import RoleActions from '@/components/roles/role-actions';
import { RoleWithCounts } from '@/types';

export default function RoleTable({ roles }: { roles: RoleWithCounts[] }) {
    return (
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
                {roles.map((role: RoleWithCounts) => (
                    <tr key={role.id}>
                        <td className={'text-center'}>{role.name}</td>

                        <td className={'text-center'}>
                            {role.permissions_count}
                        </td>

                        <td className={'text-center'}>{role.users_count}</td>

                        <td>
                            <RoleActions role={role} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
