import {ChangeEvent, FormHTMLAttributes, ReactNode} from 'react';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    name: string
    children: ReactNode
}

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
    children: ReactNode;
};

export type FormRowLabelProps = {
    className?: string;
    children: ReactNode;
};

export type FormCheckboxGroupProps = {
    options: CheckboxOption[];
    selectedValues: (string | number)[];
    onChange: (
        option: CheckboxOption,
        event: ChangeEvent<HTMLInputElement>,
    ) => void;
    gridClassName?: string;
};
