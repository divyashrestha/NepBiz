import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/debounce';
import { router } from '@inertiajs/react';
import { CustomChangeEvent } from '@/types/custom';

export default function CustomSearch({
    search,
    url,
    placeholder,
}: {
    search: string;
    url: string;
    placeholder: string;
}) {
    const [filterSearch, setFilterSearch] = useState(search);
    const [mounted, setMounted] = useState(false);
    const debouncedSearch = useDebounce(filterSearch, 500);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }
        router.get(
            url,
            { search: debouncedSearch },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, [debouncedSearch]);
    return (
        <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4" />
            <Input
                className="pl-10"
                placeholder={placeholder}
                value={filterSearch}
                onChange={(e: CustomChangeEvent) =>
                    setFilterSearch(e.target.value)
                }
            />
        </div>
    );
}
