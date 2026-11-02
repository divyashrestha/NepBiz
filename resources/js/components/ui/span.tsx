import * as React from "react"
import { cn } from "@/lib/utils"

function Span({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="span"
            className={cn(
                "text-foreground text-base md:text-sm transition-colors",
                'wrap-anywhere',
                className
            )}
            {...props}
        />
    )
}

export { Span }
