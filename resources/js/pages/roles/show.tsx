import { RoleWithPermissionsUsers } from '@/types';
import { Head } from '@inertiajs/react';
import roles from '@/routes/roles';
import { AuthorizedLink } from '@/components/ui/authorized-link';
import { ShowPage } from '@/components/ui/show';
import { Info, KeyRound, ShieldCheck, UserCheck } from 'lucide-react';

type ShowProps = { role: RoleWithPermissionsUsers };

export default function Show({ role }: ShowProps) {
    return (
        <>
            <Head title="Show roles" />
            <ShowPage>
                <ShowPage.Header>
                    <div className="space-y-1">
                        <AuthorizedLink
                            perform="roles.view"
                            href={roles.index().url}
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                        >
                            <ShowPage.BackButton>
                                Back to Roles
                            </ShowPage.BackButton>
                        </AuthorizedLink>
                        <ShowPage.HeaderTitle>
                            Role Details
                        </ShowPage.HeaderTitle>
                    </div>
                    <div>
                        <AuthorizedLink
                            perform="roles.update"
                            href={roles.edit(role.id).url}
                        >
                            <ShowPage.EditButton>Edit Role</ShowPage.EditButton>
                        </AuthorizedLink>
                    </div>
                </ShowPage.Header>

                <ShowPage.Grid cols={2}>
                    <ShowPage.Card
                        icon={<ShieldCheck className="h-5 w-5" />}
                        iconVariant="blue"
                    >
                        <ShowPage.CardBody title="Name" values={role.name} />
                    </ShowPage.Card>
                    <ShowPage.Card
                        icon={<Info className="h-5 w-5" />}
                        iconVariant="purple"
                    >
                        <ShowPage.CardBody
                            title="Guard"
                            values={role.guard_name}
                        />
                    </ShowPage.Card>
                </ShowPage.Grid>
                <ShowPage.Grid cols={1}>
                    <ShowPage.Card
                        icon={<KeyRound className="h-5 w-5" />}
                        iconVariant="blue"
                    >
                        <ShowPage.CardBody
                            title="Permissions"
                            values={role.permissions}
                        />
                    </ShowPage.Card>
                    <ShowPage.Card
                        icon={<UserCheck className="h-5 w-5" />}
                        iconVariant="blue"
                    >
                        <ShowPage.CardBody title="Users" values={role.users} />
                    </ShowPage.Card>
                </ShowPage.Grid>
            </ShowPage>
        </>
    );
}
Show.layout = {
    breadcrumbs: [
        {
            title: 'Show Role',
            href: roles.show,
        },
    ],
};
