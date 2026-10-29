import { Permission, Role, User } from '@/types';
import roles from '@/routes/roles';
import { Head } from '@inertiajs/react';
import users from '@/routes/users';
import { AuthorizedLink } from '@/components/ui/authorized-link';
import { ShowPage } from '@/components/ui/show';
import { LucideMail, KeyRound, UserCircle } from 'lucide-react';

type ShowProps = { user: User & { permissions: Permission[]; roles: Role[] } };

export default function Show({ user }: ShowProps) {
    return (
        <>
            <Head title={'Show user'}></Head>
            <ShowPage>
                <ShowPage.Header>
                    <div className="space-y-1">
                        <AuthorizedLink
                            href={users.index()}
                            perform="users.view"
                            className={
                                'inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100'
                            }
                        >
                            <ShowPage.BackButton>
                                Back to Users
                            </ShowPage.BackButton>
                        </AuthorizedLink>
                        <ShowPage.HeaderTitle>
                            User Details
                        </ShowPage.HeaderTitle>
                    </div>
                    <div>
                        <AuthorizedLink
                            perform="users.update"
                            href={users.edit(user.id).url}
                        >
                            <ShowPage.EditButton>Edit User</ShowPage.EditButton>
                        </AuthorizedLink>
                    </div>
                </ShowPage.Header>
                <ShowPage.Grid cols={2}>
                    <ShowPage.Card
                        icon={<UserCircle className="h-5 w-5" />}
                        iconVariant="zinc"
                    >
                        <ShowPage.CardBody title="Name" values={user.name} />
                    </ShowPage.Card>
                    <ShowPage.Card
                        icon={<LucideMail className="h-5 w-5" />}
                        iconVariant="zinc"
                    >
                        <ShowPage.CardBody title="Email" values={user.email} />
                    </ShowPage.Card>
                    <ShowPage.Card
                        icon={<KeyRound className="h-5 w-5" />}
                        iconVariant="zinc"
                    >
                        <ShowPage.CardBody title="Roles" values={user.roles} />
                    </ShowPage.Card>
                </ShowPage.Grid>
                <ShowPage.Grid>
                    <ShowPage.Card
                        icon={<KeyRound className="h-5 w-5" />}
                        iconVariant="zinc"
                    >
                        <ShowPage.CardBody
                            title="Permissions"
                            values={user.permissions}
                        />
                    </ShowPage.Card>
                </ShowPage.Grid>
            </ShowPage>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Show User',
            href: roles.show,
        },
    ],
};
