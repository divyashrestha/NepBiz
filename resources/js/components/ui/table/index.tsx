
// Main Table Wrapper
import {TableProps, HeaderProps, BodyProps, RowProps, CellProps} from "@/types";
import {cn} from "@/lib/utils";

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
