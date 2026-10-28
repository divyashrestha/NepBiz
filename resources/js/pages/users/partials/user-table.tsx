import { Role, UserIndex, UserTableData } from '@/types';
import Pagination from '@/components/pagination';
import { Span } from '@/components/ui/span';
import { DataTable } from '@/components/ui/table';
import * as userRouter from '@/routes/users';

export default function UserTable({ users }: { users: UserIndex }) {
    const columns = ['Name', 'Email', 'Roles', 'Role Count', 'Actions'];
    return (
        <div className="rounded-xl border">
            <DataTable className="rounded-lg shadow-sm" id="roles-data-table">
                <DataTable.Header columns={columns} />

                <DataTable.Body
                    isEmpty={users.data.length === 0}
                    colSpan={columns.length}
                >
                    {users.data.map((user: UserTableData) => (
                        <DataTable.Row key={user.id}>
                            <DataTable.Cell className="text-left font-medium">
                                {user.name}
                            </DataTable.Cell>
                            <DataTable.Cell className="text-left font-medium">
                                {user.email}
                            </DataTable.Cell>
                            <DataTable.Cell className="text-left font-medium">
                                {user.roles.map((role: Role) => (
                                    <Span
                                        className="badge badge-outline badge-success"
                                        key={role.id}
                                    >
                                        {role.name}
                                    </Span>
                                ))}
                            </DataTable.Cell>
                            <DataTable.Cell>{user.roles_count}</DataTable.Cell>

                            <DataTable.Action
                                id={user.id}
                                resourceName="permission"
                                routes={{
                                    show: userRouter.show(user.id).url,
                                    edit: userRouter.edit(user.id).url,
                                    destroy: userRouter.destroy(user.id).url,
                                }}
                                permissions={{
                                    view: 'users.view',
                                    update: 'users.update',
                                    delete: 'users.delete',
                                }}
                            />
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable>
            <Pagination links={users.links} />
        </div>
    );
}
