import permissions from '@/routes/permissions';
import { Head } from '@inertiajs/react';
import { Permission } from '@/types';
import { AuthorizedLink } from '@/components/ui/authorized-link';
import { Info, ShieldCheck } from 'lucide-react';
import { ShowPage } from '@/components/ui/show';

type ShowProps = { permission: Permission };

export default function Show({ permission }: ShowProps) {
    return (
        <>
            <Head title="Show roles" />

            <ShowPage>
                <ShowPage.Header>
                    <div className="space-y-1">
                        <AuthorizedLink
                            perform="permissions.view"
                            href={permissions.index().url}
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                        >
                            <ShowPage.BackButton>
                                Back to Permissions
                            </ShowPage.BackButton>
                        </AuthorizedLink>
                        <ShowPage.HeaderTitle>
                            Permission Details
                        </ShowPage.HeaderTitle>
                    </div>
                    <div>
                        <AuthorizedLink
                            perform="permissions.update"
                            href={permissions.edit(permission.id).url}
                        >
                            <ShowPage.EditButton>
                                Edit Permission
                            </ShowPage.EditButton>
                        </AuthorizedLink>
                    </div>
                </ShowPage.Header>

                <ShowPage.Grid cols={2}>
                    <ShowPage.Card
                        icon={<ShieldCheck className="h-5 w-5" />}
                        iconVariant="blue"
                    >
                        <ShowPage.CardBody
                            title="Name"
                            values={permission.name}
                        />
                    </ShowPage.Card>
                    <ShowPage.Card
                        icon={<Info className="h-5 w-5" />}
                        iconVariant="purple"
                    >
                        <ShowPage.CardBody
                            title="Gaurd"
                            values={permission.guard_name}
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
            title: 'Show permission',
            href: permissions.show,
        },
    ],
};
