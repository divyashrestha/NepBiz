import { ComponentPropsWithoutRef } from 'react';

export type TableProps = ComponentPropsWithoutRef<'table'>;

export type HeaderProps = ComponentPropsWithoutRef<'thead'> & {
    columns: string[];
    headerClassName?: string;
    rowClassName?: string;
};

export type BodyProps = ComponentPropsWithoutRef<'tbody'> & {
    isEmpty: boolean;
    colSpan: number;
    emptyMessage?: string;
    emptyClassName?: string;
};

export type RowProps = ComponentPropsWithoutRef<'tr'>;

export type CellProps = ComponentPropsWithoutRef<'td'>;

export type RowActionsProps = {
    id: string | number;
    resourceName: string; // Used dynamically in confirmation alerts (e.g., 'permission', 'user')
    routes: {
        show?: string;
        edit?: string;
        destroy?: string;
    };
    permissions: {
        view?: string;
        update?: string;
        delete?: string;
    };
};
