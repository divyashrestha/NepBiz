import { RoleIndex, RoleWithCounts } from '@/types';
import Pagination from '@/components/pagination';
import { DataTable } from '@/components/ui/table';
import * as roleRouter from '@/routes/roles';

type RoleTableProps = { roles: RoleIndex };

export default function RoleTable({ roles }: RoleTableProps) {
    const columns = ['Name', 'Permissions', 'Users', 'Actions'];
    return (
        <div className="rounded-xl border">
            <DataTable className="rounded-lg shadow-sm" id="roles-data-table">
                <DataTable.Header columns={columns} />

                <DataTable.Body
                    isEmpty={roles.data.length === 0}
                    colSpan={columns.length}
                >
                    {roles.data.map((role: RoleWithCounts) => (
                        <DataTable.Row key={role.id}>
                            <DataTable.Cell className="text-left font-medium">
                                {role.name}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {role.permissions_count}
                            </DataTable.Cell>
                            <DataTable.Cell>{role.users_count}</DataTable.Cell>

                            <DataTable.Action
                                id={role.id}
                                resourceName="permission"
                                routes={{
                                    show: roleRouter.show(role.id).url,
                                    edit: roleRouter.edit(role.id).url,
                                    destroy: roleRouter.destroy(role.id).url,
                                }}
                                permissions={{
                                    view: 'roles.view',
                                    update: 'roles.update',
                                    delete: 'roles.delete',
                                }}
                            />
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable>
            <Pagination links={roles.links} />
        </div>
    );
}
