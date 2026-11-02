import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type GridCols = 1 | 2 | 3 | 4;
export type GridGaps = GridCols;

export type ShowProps = ComponentPropsWithoutRef<'div'> & {
    title: string;
};

export type ShowHeaderTitleProps = ComponentPropsWithoutRef<'h1'>;
export type ShowHeaderProps = ComponentPropsWithoutRef<'div'>;
export type ShowEditButtonProps = ComponentPropsWithoutRef<'button'>;
export type ShowBackButtonProps = ComponentPropsWithoutRef<'button'>;

export type GridProps = ComponentPropsWithoutRef<'div'> & {
    cols?: GridCols;
    gaps?: GridGaps;
};

export type CardProps = ComponentPropsWithoutRef<'div'> & {
    icon: ReactNode;
    iconVariant?: 'blue' | 'purple' | 'amber' | 'zinc';
};
export type CardBodyProps = ComponentPropsWithoutRef<'div'> & {
    title: string;
    values: any;
};
export type SectionProps = ComponentPropsWithoutRef<'div'>;

export type SectionHeaderProps = ComponentPropsWithoutRef<'div'> & {
    title: string;
    description?: string;
};

export type ListProps = ComponentPropsWithoutRef<'dl'>;

export type ShowRowProps = ComponentPropsWithoutRef<'div'> & {
    label: string;
};
