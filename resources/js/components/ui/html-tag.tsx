import {ReactNode} from "react";

type TagProps = {
    children: ReactNode;
    className?: string;
}

export const HtmlTag = ({children}: TagProps) => {
    return (
        <>
            {children}
        </>
    )
};

HtmlTag.Div = ({className, children, ...props}: TagProps) => {
    return (<div className={className}>{children}</div>);
};


HtmlTag.H1 = ({className, children, ...props}: TagProps) => {
    return (<h1 className={className} {...props}>{children}</h1>);
};

