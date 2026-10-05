import { Head, Link } from '@inertiajs/react';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoleTable from './partials/role-table';
import { RoleIndex } from '@/types';
import * as roleRoutes from '@/routes/roles';
import RoleSearch from '@/components/roles/role-search';
import RoleStats from '@/components/roles/role-stats';

export default function Index({ roles }: { roles: RoleIndex }) {
    return (
        <>
            <Head title="Roles" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield />
                        <h1 className="text-3xl font-bold">Roles</h1>
                    </div>

                    <Link href={roleRoutes.create()}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Role
                        </Button>
                    </Link>
                </div>

                <RoleStats roles={roles.data} />

                <RoleSearch />

                <RoleTable roles={roles.data} />
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: roleRoutes.index(),
        },
    ],
};
