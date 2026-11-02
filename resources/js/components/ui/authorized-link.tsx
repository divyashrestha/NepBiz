import {
    Link,
    InertiaLinkProps
} from '@inertiajs/react';
import {ReactNode} from "react";
import {Can} from "@/components/ui/can"; // Import your existing Can component

// Extend Inertia's LinkProps to include your custom `perform` property
interface CanLinkProps extends InertiaLinkProps {
    perform?: string;
}

export function AuthorizedLink({ perform, children, ...props }: CanLinkProps) {

    if (!perform) {
        return <Link {...props}>{children}</Link>;
    }

    return (
        <Can perform={perform}>
            <Link {...props}>
                {children}
            </Link>
        </Can>
    );
}
