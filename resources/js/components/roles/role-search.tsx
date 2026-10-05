import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function RoleSearch() {
    return (
        <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4" />

            <Input className="pl-10" placeholder="Search roles..." />
        </div>
    );
}
