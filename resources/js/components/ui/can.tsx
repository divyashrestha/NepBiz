import {usePermissions} from "@/lib/can";
import {ReactNode} from "react";

interface CanProps {
    perform?: string;
    children: ReactNode;
    fallback?: ReactNode;
}

export function Can({ perform, children, fallback = null }: CanProps) {
    const { can } = usePermissions();
    if (!perform) return null;
    return can(perform) ? children : fallback;
}
