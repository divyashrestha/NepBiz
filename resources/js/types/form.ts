import * as React from 'react';

export type CheckboxOption = {
    id: string | number;
    name: string;
};

export type FormContextType = {
    id: string;
    error?: string;
};

export type FormRowProps = {
    id?: string;
    error?: string;
    className?: string;
    children: React.ReactNode;
};

export type FormRowLabelProps = {
    className?: string;
    children: React.ReactNode;
};

export type FormCheckboxGroupProps = {
    options: CheckboxOption[];
    selectedValues: (string | number)[];
    onChange: (
        option: CheckboxOption,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    gridClassName?: string;
};
