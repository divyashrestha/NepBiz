import {TableProps, HeaderProps, BodyProps, RowProps, CellProps, RowActionsProps} from "@/types";
import {cn} from "@/lib/utils";
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { AuthorizedLink } from "@/components/ui/authorized-link";
import { Can } from "@/components/ui/can";

// Main Table Wrapper
export const DataTable = ({ children, className='', ...props }: TableProps) => (
    <table className={cn(`w-full text-left border-collapse`, className)} {...props}>{children}</table>
);

// Table Header Component
DataTable.Header = ({ columns, headerClassName='', rowClassName='', className='' }: HeaderProps) => (
    <thead className={cn('', headerClassName)}>
        <tr className={cn('', rowClassName)}>
            {columns.map((colName, idx) => (
                <th key={idx} className={cn("p-3 font-semibold border-b border-r text-center", className)}>
                    {colName}
                </th>
            ))}
        </tr>
    </thead>
);

// Table Body Wrapper
DataTable.Body = ({ children, isEmpty, colSpan, emptyMessage = "No data found", emptyClassName = "", className='', ...props }: BodyProps) => (
    <tbody className={cn("", className)} {...props}>
        {isEmpty ? (
            <DataTable.Row>
                <DataTable.Cell colSpan={colSpan} className={cn("p-3 text-gray-500", emptyClassName)}>
                    {emptyMessage}
                </DataTable.Cell>
            </DataTable.Row>
        ) : (
            children
        )}
    </tbody>
);

// Individual Table Row
DataTable.Row = ({ children, className='', ...props }: RowProps) => (
    <tr className={cn("hover:opacity-90 transition-colors", className)} {...props}>{children}</tr>
);

// Individual Table Cell
DataTable.Cell = ({ children, className = "text-center", ...props }: CellProps) => (
    <td className={cn(`px-3 py-2 border-b border-r`,className)} {...props} >{children}</td>
);

DataTable.Action = ({id, resourceName, routes, permissions,}: RowActionsProps) =>{
    const handleDelete = () => {
        if (!routes.destroy) return;

        if (confirm(`Are you sure you want to delete this ${resourceName}?`)) {
            router.delete(routes.destroy);
        }
    };

    return (
        <DataTable.Cell key={id}>
            <div className="flex gap-2">
                {/* View Action */}
                {routes.show && permissions.view && (
                    <AuthorizedLink perform={permissions.view} href={routes.show}>
                        <Button size="icon" variant="outline" className={'cursor-pointer'}>
                            <Eye className="h-4 w-4" />
                        </Button>
                    </AuthorizedLink>
                )}

                {/* Edit Action */}
                {routes.edit && permissions.update && (
                    <AuthorizedLink perform={permissions.update} href={routes.edit}>
                        <Button size="icon" variant="outline" className={'cursor-pointer'}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </AuthorizedLink>
                )}

                {/* Delete Action */}
                {routes.destroy && permissions.delete && (
                    <Can perform={permissions.delete}>
                        <Button size="icon" variant="destructive" onClick={handleDelete} className={'cursor-pointer'}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Can>
                )}
            </div>
        </DataTable.Cell>

    );
};
