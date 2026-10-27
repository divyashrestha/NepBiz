import PermissionActions from '@/components/permissions/permission-actions';
import Pagination from '@/components/pagination';
import {PermissionIndex, PermissionWithRoleCount} from '@/types';
import {DataTable} from "@/components/ui/table";

type PermissionProps = { permissions: PermissionIndex };

export default function PermissionTable({ permissions }: PermissionProps) {
    const columns = ['Name', 'Guard', 'Roles', 'Actions'];
    return (
        <div className="rounded-xl border">
            <DataTable className="shadow-sm rounded-lg" id="roles-data-table">
                <DataTable.Header columns={columns}/>

                <DataTable.Body isEmpty={permissions.data.length === 0} colSpan={columns.length}>
                    {permissions.data.map((permission: PermissionWithRoleCount) => (
                        <DataTable.Row key={permission.id}>
                            <DataTable.Cell className="font-medium text-left">{permission.name}</DataTable.Cell>
                            <DataTable.Cell className="font-medium text-left">{permission.guard_name}</DataTable.Cell>
                            <DataTable.Cell>{permission.roles_count}</DataTable.Cell>

                            <DataTable.Cell>
                                <PermissionActions permission={permission}/>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable>
            <Pagination links={permissions.links} />
        </div>
    );
}
