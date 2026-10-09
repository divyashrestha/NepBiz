import { Role, UserIndex, UserTableData } from '@/types';
import UserActions from '@/components/users/user-actions';
import Pagination from '@/components/pagination';
import { Span } from '@/components/ui/span';

export default function UserTable({ users }: { users: UserIndex }) {
    return (
        <div className="rounded-xl border">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Role Count</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className={'text-center'}>
                                No Users found
                            </td>
                        </tr>
                    ) : (
                        users.data.map((user: UserTableData) => (
                            <tr key={user.id}>
                                <td className={'text-center'}>{user.name}</td>

                                <td className={'text-center'}>{user.email}</td>

                                <td className={'text-center'}>
                                    {user.roles.map((role: Role) => (
                                        <Span
                                            className="badge badge-outline badge-success"
                                            key={role.id}
                                        >
                                            {role.name}
                                        </Span>
                                    ))}
                                </td>
                                <td className={'text-center'}>
                                    {user.roles_count}
                                </td>

                                <td>
                                    <UserActions user={user} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination links={users.links} />
        </div>
    );
}
