import {Head} from "@inertiajs/react";
import {ReactNode} from "react";
import {HtmlTag} from "@/components/ui/html-tag";

type PageProps = {
    children: ReactNode;
    title: string;
}
export const PageLayout = ({title,children}:PageProps)=>{
    return (
        <HtmlTag>
            <Head title={title}/>
            {children}
        </HtmlTag>
    )
}

