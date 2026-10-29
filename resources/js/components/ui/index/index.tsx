import {Button} from "@/components/ui/button";
import {KeyRound, Plus} from "lucide-react";
import {AuthorizedLink} from "@/components/ui/authorized-link";
import {ReactNode} from "react";

type IndexCreateButtonProps = {
    children: ReactNode;
    url: string;
}

export const IndexCreateButton = ({children, url}: IndexCreateButtonProps) => {
    return (
        <AuthorizedLink perform="roles.create" href={url}>
            <Button>
                <Plus className="mr-2 h-4 w-4"/>
                {children}
            </Button>
        </AuthorizedLink>
    )
}
type IndexTitleProps = {
    children: ReactNode;
}

export const  IndexTitle =({children}: IndexTitleProps)=>{
    return(
        <div className="flex items-center gap-2">
            <KeyRound />
            <h1 className="text-3xl font-bold">{children}</h1>
        </div>
    )
}
