import { Permission, Role, User } from '@/types';
import roles from '@/routes/roles';
import users from '@/routes/users';
import { AuthorizedLink } from '@/components/ui/authorized-link';;
import { LucideMail, KeyRound, UserCircle } from 'lucide-react';
import {HtmlTag} from "@/components/ui/html-tag";
import {ShowPage} from "@/components/ui/pages/ShowPage";

type ShowProps = { user: User & { permissions: Permission[]; roles: Role[] } };

export default function Show({ user }: ShowProps) {
    return (
            <ShowPage title='Show user'>
                <ShowPage.Header>
                    <HtmlTag.Div className="space-y-1">
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
                    </HtmlTag.Div>
                    <HtmlTag.Div>
                        <AuthorizedLink
                            perform="users.update"
                            href={users.edit(user.id).url}
                        >
                            <ShowPage.EditButton>Edit User</ShowPage.EditButton>
                        </AuthorizedLink>
                    </HtmlTag.Div>
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
