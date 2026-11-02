import {Button} from "@/components/ui/button";
import {KeyRound, Plus} from "lucide-react";
import {AuthorizedLink} from "@/components/ui/authorized-link";
import {ReactNode} from "react";
import {HtmlTag} from "@/components/ui/html-tag";
import {PageLayout} from "@/components/ui/pages/index";
import {cn} from "@/lib/utils";

type IndexProps = {
    children: ReactNode;
    title: string;
}

export const IndexPage =({children, title,...props}: IndexProps) =>{
    return(
        <PageLayout title={title}>
            {children}
        </PageLayout>
    )
}

type IndexCreateButtonProps = {
    children: ReactNode;
    url: string;
}

IndexPage.CreateButton = ({children, url}: IndexCreateButtonProps) => {
    return (
        <AuthorizedLink perform="roles.create" href={url}>
            <Button>
                <Plus className="mr-2 h-4 w-4"/>
                {children}
            </Button>
        </AuthorizedLink>
    )
}

type IndexHeaderProps = {
    children: ReactNode;
}

IndexPage.Header =({children}: IndexHeaderProps)=>{
    return(
        <HtmlTag.Div className="flex items-center gap-2">
            <KeyRound />
            <HtmlTag.H1 className="text-3xl font-bold">{children}</HtmlTag.H1>
        </HtmlTag.Div>
    )
}

type IndexStatusProps= {
    className?: string;
    gaps?: number;
    data: {name: string, value: string |number}[];
    gridCols?: number
}

IndexPage.Stats = ({ className ,gridCols=1, data, gaps=1}: IndexStatusProps) => {
    return(
        <HtmlTag.Div className={cn("grid ", `gap-${gaps}`, `md:grid-cols-${gridCols}`, className)}>
            {data.map((item, id)=>(
                <HtmlTag.Div key={id} className="rounded-xl border p-5">
                    <HtmlTag.H3>{item.name}</HtmlTag.H3>
                    <HtmlTag.P className="text-3xl font-bold">{item.value}</HtmlTag.P>
                </HtmlTag.Div>
            ))}
        </HtmlTag.Div>
    );
}
