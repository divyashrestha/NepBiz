import { cn } from "@/lib/utils";
import {
    ShowHeaderProps, ShowProps, GridProps, CardProps, SectionProps, SectionHeaderProps, ListProps, ShowRowProps,
    ShowHeaderTitleProps, GridCols, ShowEditButtonProps, ShowBackButtonProps, Permission, CardBodyProps
} from "@/types";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Pencil} from "lucide-react";
import {PageLayout} from "@/components/ui/pages/index";

export const ShowPage = ({ title, className, children, ...props }: ShowProps) => {
    return(
        <PageLayout title={title}>
            <div
                className={cn("p-6 space-y-6 text-zinc-900 dark:text-zinc-100 transition-colors duration-200", className)} {...props}>
                {children}
            </div>
        </PageLayout>
    )
};

ShowPage.Header = ({ className, children, ...props }: ShowHeaderProps) => (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800", className)} {...props}>
        {children}
    </div>
);


ShowPage.HeaderTitle = ({ className, children, ...props }: ShowHeaderTitleProps) => (
    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl" {...props}>
        {children}
    </h1>
);

ShowPage.EditButton = ({ className, children }: ShowEditButtonProps) => (
    <Button className={cn("inline-flex items-center gap-2", className)}>
        <Pencil className="h-4 w-4" />
        {children}
    </Button>
);

ShowPage.BackButton = ({ children }: ShowBackButtonProps) => (
    <>
        <ArrowLeft className="h-4 w-4" />
        {children}
    </>
);

ShowPage.Grid = ({ className, children, cols = 1,gaps= 4, ...props }: GridProps) => {
    const gridCols: Record<GridCols, string> = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    };

    return (
        <div className={cn("grid ", gridCols[cols], `gap-${gaps}`, className)} {...props}>
            {children}
        </div>
    )
};

ShowPage.Card = ({ icon, iconVariant = 'zinc', className, children, ...props }: CardProps) => {
    const iconStyles = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
        purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
        amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
        zinc: "bg-zinc-50 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    };

    return (
        <div className={cn("flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-xl shadow-sm dark:bg-zinc-900 dark:border-zinc-800", className)} {...props}>
            <div className={cn("p-2.5 rounded-lg shrink-0", iconStyles[iconVariant])}>
                {icon}
            </div>
            <div className="min-w-0 truncate">
                {children}
            </div>
        </div>
    );
};

ShowPage.CardBody = ({ title, values }: CardBodyProps) => {
    const type = typeof values === "string" ? "text" : "array";

    return (
        <div>
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider truncate">
                {title}
            </p>

            {type === "text" ? (
                <div className="text-sm font-semibold truncate">
                    {values}
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 text-sm font-semibold truncate py-1.5">
                    {values.map((value: any) => (
                        <span
                            key={value.id}
                            className="rounded bg-primary px-3 py-1 text-primary-foreground"
                        >
                            {value.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

ShowPage.Section = ({ className, children, ...props }: SectionProps) => (
    <div className={cn("bg-white border border-zinc-100 rounded-xl shadow-sm overflow-hidden dark:bg-zinc-900 dark:border-zinc-800", className)} {...props}>
        {children}
    </div>
);

ShowPage.SectionHeader = ({ title, description, className, ...props }: SectionHeaderProps) => (
    <div className={cn("px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50", className)} {...props}>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
        {description && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>}
    </div>
);


ShowPage.List = ({ className, children, ...props }: ListProps) => (
    <dl className={cn("divide-y divide-zinc-100 dark:divide-zinc-800 text-sm", className)} {...props}>
        {children}
    </dl>
);

ShowPage.Row = ({ label, children, className, ...props }: ShowRowProps) => (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors", className)} {...props}>
        <dt className="font-medium text-zinc-500 dark:text-zinc-400">{label}</dt>
        <dd className="text-zinc-600 dark:text-zinc-300 sm:col-span-2 leading-relaxed break-words">{children}</dd>
    </div>
);
