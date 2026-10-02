import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Role } from '@/types';
import roles from '@/routes/roles';

export default function RoleActions({ role }: { role: Role }) {
    const destroyRole = () => {
        if (confirm(' Are you sure you want to delete this Role?')) {
            router.delete(roles.destroy(role.id).url);
        }
    };
    return (
        <div className="flex gap-2">
            <Link href={roles.show(role.id)}>
                <Button size="icon" variant="outline">
                    <Eye />
                </Button>
            </Link>

            <Link href={roles.edit(role.id)}>
                <Button size="icon" variant="outline">
                    <Pencil />
                </Button>
            </Link>

            <Button size="icon" variant="destructive" onClick={destroyRole}>
                <Trash2 />
            </Button>
        </div>
    );
}
