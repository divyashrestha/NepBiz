import RoleActions from '@/components/roles/role-actions';
import { RoleIndex, RoleWithCounts } from '@/types';
import Pagination from '@/components/pagination';
import {DataTable} from "@/components/ui/table";

type RoleTableProps = { roles: RoleIndex };

export default function RoleTable({ roles }: RoleTableProps) {
    const columns = ['Name', 'Permissions', 'Users', 'Actions'];
    return (
        <div className="rounded-xl border">
            <DataTable className="shadow-sm rounded-lg" id="roles-data-table">
                <DataTable.Header columns={columns}/>

                <DataTable.Body isEmpty={roles.data.length === 0} colSpan={columns.length}>
                    {roles.data.map((role: RoleWithCounts) => (
                        <DataTable.Row key={role.id}>
                            <DataTable.Cell className="font-medium text-left">{role.name}</DataTable.Cell>
                            <DataTable.Cell>{role.permissions_count}</DataTable.Cell>
                            <DataTable.Cell>{role.users_count}</DataTable.Cell>

                            <DataTable.Cell>
                                <RoleActions role={role} />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable>
            <Pagination links={roles.links} />
        </div>
    );
}
