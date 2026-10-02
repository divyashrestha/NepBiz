import {Link, router} from '@inertiajs/react';
import {Eye, Pencil, Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Role} from "@/types";
import roles from "@/routes/roles";

export default function RoleActions({role,}: { role: Role }) {
    return (
        <div className="flex gap-2">
            <Link href={roles.show(role.id)}>
                <Button size="icon" variant="outline">
                    <Eye/>
                </Button>
            </Link>

            <Link href={roles.edit(role.id)}>
                <Button size="icon" variant="outline">
                    <Pencil/>
                </Button>
            </Link>

            <Button size="icon" variant="destructive" onClick={() => router.delete(roles.destroy(role.id))}>
                <Trash2/>
            </Button>

        </div>
    );
}
