import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import permissions from '@/routes/permissions';
import { Permission } from '@/types';

type PermissionActionProps = { permission: Permission };

export default function PermissionActions({
    permission,
}: PermissionActionProps) {
    const destroy = () => {
        if (confirm('Are you sure you want to delete this permission?')) {
            router.delete(permissions.destroy(permission.id).url);
        }
    };

    return (
        <div className="flex gap-2">
            <Link href={permissions.show(permission.id)}>
                <Button size="icon" variant="outline">
                    <Eye />
                </Button>
            </Link>

            <Link href={permissions.edit(permission.id)}>
                <Button size="icon" variant="outline">
                    <Pencil />
                </Button>
            </Link>

            <Button size="icon" variant="destructive" onClick={destroy}>
                <Trash2 />
            </Button>
        </div>
    );
}
