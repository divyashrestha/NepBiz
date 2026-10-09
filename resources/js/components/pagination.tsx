import { router } from '@inertiajs/react';
import { PaginationLink } from '@/types';

type PaginationProps = {
    links: PaginationLink[];
};

export default function Pagination({ links }: PaginationProps) {
    if (!links || links.length <= 3) return null;
    const navigate = (url: string | null) => {
        if (!url) return;

        router.visit(url, { preserveScroll: true, preserveState: true });
    };
    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => navigate(link.url)}
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                        link.active
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
