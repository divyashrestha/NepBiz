import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Role } from '@/types';
import roles from '@/routes/roles';
import {Can} from "@/components/ui/can";
import {AuthorizedLink} from "@/components/ui/authorized-link";

type RoleActionsProps = { role: Role };

export default function RoleActions({ role }: RoleActionsProps) {
    const destroy = () => {
        if (confirm('Are you sure you want to delete this Role?')) {
            router.delete(roles.destroy(role.id).url);
        }
    };
    return (
        <div className="flex gap-2">
            <AuthorizedLink perform='roles.view' href={roles.show(role.id)}>
                <Button size="icon" variant="outline">
                    <Eye />
                </Button>
            </AuthorizedLink>

            <AuthorizedLink perform="roles.update" href={roles.edit(role.id)}>
                <Button size="icon" variant="outline">
                    <Pencil />
                </Button>
            </AuthorizedLink>

            <Can perform='roles.delete'>
                <Button size="icon" variant="destructive" onClick={destroy}>
                    <Trash2 />
                </Button>
            </Can>
        </div>
    );
}
