import Pagination from '@/components/pagination';
import { PermissionIndex, PermissionWithRoleCount } from '@/types';
import { DataTable } from '@/components/ui/table';
import * as permissionRouter from '@/routes/permissions';

type PermissionProps = { permissions: PermissionIndex };

export default function PermissionTable({ permissions }: PermissionProps) {
    const columns = ['Name', 'Guard', 'Roles', 'Actions'];
    return (
        <div className="rounded-xl border">
            <DataTable className="rounded-lg shadow-sm" id="roles-data-table">
                <DataTable.Header columns={columns} />

                <DataTable.Body
                    isEmpty={permissions.data.length === 0}
                    colSpan={columns.length}
                >
                    {permissions.data.map(
                        (permission: PermissionWithRoleCount) => (
                            <DataTable.Row key={permission.id}>
                                <DataTable.Cell className="text-left font-medium">
                                    {permission.name}
                                </DataTable.Cell>
                                <DataTable.Cell className="text-left font-medium">
                                    {permission.guard_name}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {permission.roles_count}
                                </DataTable.Cell>

                                <DataTable.Action
                                    id={permission.id}
                                    resourceName="permission"
                                    routes={{
                                        show: permissionRouter.show(
                                            permission.id,
                                        ).url,
                                        edit: permissionRouter.edit(
                                            permission.id,
                                        ).url,
                                        destroy: permissionRouter.destroy(
                                            permission.id,
                                        ).url,
                                    }}
                                    permissions={{
                                        view: 'permissions.view',
                                        update: 'permissions.update',
                                        delete: 'permissions.delete',
                                    }}
                                />
                            </DataTable.Row>
                        ),
                    )}
                </DataTable.Body>
            </DataTable>
            <Pagination links={permissions.links} />
        </div>
    );
}
