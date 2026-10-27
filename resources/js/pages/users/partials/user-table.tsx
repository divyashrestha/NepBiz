import { Role, UserIndex, UserTableData} from '@/types';
import Pagination from '@/components/pagination';
import { Span } from '@/components/ui/span';
import {DataTable} from "@/components/ui/table";

export default function UserTable({ users }: { users: UserIndex }) {
    const columns = ['Name', 'Email', 'Roles', 'Role Count', 'Actions'];
    return (
        <div className="rounded-xl border">
            <DataTable className="shadow-sm rounded-lg" id="roles-data-table">
                <DataTable.Header columns={columns}/>

                <DataTable.Body isEmpty={users.data.length === 0} colSpan={columns.length}>
                    {users.data.map((user: UserTableData) => (
                        <DataTable.Row key={user.id}>
                            <DataTable.Cell className="font-medium text-left">{user.name}</DataTable.Cell>
                            <DataTable.Cell className="font-medium text-left">{user.email}</DataTable.Cell>
                            <DataTable.Cell className="font-medium text-left">
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

                            <DataTable.Cell>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable>
            <Pagination links={users.links} />
        </div>
    );
}
