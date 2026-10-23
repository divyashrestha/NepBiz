import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import permissions from '@/routes/permissions';
import { Permission } from '@/types';
import {AuthorizedLink} from "@/components/ui/authorized-link";
import {Can} from "@/components/ui/can";

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
            <AuthorizedLink perform="permissions.view" href={permissions.show(permission.id)}>
                <Button size="icon" variant="outline">
                    <Eye />
                </Button>
            </AuthorizedLink>

            <AuthorizedLink perform="permissions.update" href={permissions.edit(permission.id)}>
                <Button size="icon" variant="outline">
                    <Pencil />
                </Button>
            </AuthorizedLink>

            <Can perform='permissions.delete'>
                <Button size="icon" variant="destructive" onClick={destroy}>
                    <Trash2 />
                </Button>
            </Can>
        </div>
    );
}
