import {ReactNode} from "react";
import {PageLayout} from "@/components/ui/pages/index";
import {HtmlTag} from "@/components/ui/html-tag";

type CreateProps = {
    children: ReactNode;
    icon: ReactNode;
    title: string;
}

export const CreatePage =({children, title, icon,...props}: CreateProps) =>{
    return(
        <PageLayout title={title}>
            <CreatePage.Header title={title} icon={icon} {...props} />
            {children}
        </PageLayout>
    )
}

type HeaderProps = {
    title: string;
    icon: ReactNode;
}

CreatePage.Header =({title, icon, ...props}:HeaderProps)=>{
    return(
        <HtmlTag.Div className="p-4 flex items-center gap-2">
            {icon}
            <HtmlTag.H1 className="text-3xl font-bold">{title}</HtmlTag.H1>
        </HtmlTag.Div>
    )
}
