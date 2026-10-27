import {ComponentPropsWithoutRef} from "react";

export type TableProps= ComponentPropsWithoutRef<'table'>

export type HeaderProps= ComponentPropsWithoutRef<'thead'> & {
    columns: string[];
    headerClassName?: string;
    rowClassName?: string;
}

export type BodyProps = ComponentPropsWithoutRef<'tbody'> & {
    isEmpty: boolean;
    colSpan: number;
    emptyMessage?: string;
    emptyClassName?: string;
}

export type RowProps = ComponentPropsWithoutRef<'tr'>

export type CellProps = ComponentPropsWithoutRef<'td'>
