import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import users from '@/routes/users';
import { User } from '@/types';

export default function UserActions({ user }: { user: User }) {
    const destroy = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(users.destroy(user.id).url);
        }
    };

    return (
        <div className="flex gap-2">
            <Link href={users.show(user.id)}>
                <Button size="icon" variant="outline">
                    <Eye />
                </Button>
            </Link>

            <Link href={users.edit(user.id)}>
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
