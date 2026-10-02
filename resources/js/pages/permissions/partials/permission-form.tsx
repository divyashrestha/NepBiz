import {Link, useForm} from '@inertiajs/react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import permissions from "@/routes/permissions";
import {Permission} from "@/types";
import {CustomChangeEvent, CustomSubmitEvent} from "@/types/custom";

export default function PermissionForm({permission = null}: { permission: Permission | null }) {
    const {data, setData, post, put, processing, errors} = useForm({name: permission?.name ?? ''});

    const submit = (e: CustomSubmitEvent) => {
        e.preventDefault();

        if (permission) {
            put(permissions.update(permission?.id).url)
            return;
        }

        post(permissions.index().url);
    };


    return (
        <form onSubmit={submit} className="space-y-4 max-w-xl">
            <Input
                value={data.name}
                placeholder="Permission Name"
                onChange={(e: CustomChangeEvent) => {
                    setData('name', e.currentTarget?.value);
                }}
            />

            {errors.name && (
                <div className="text-red-500">
                    {errors.name}
                </div>
            )}

            <Button disabled={processing}>
                {permission ? 'Update' : 'Create'}
            </Button>
            <Link href={permissions.index()} className={'btn mx-2'}>
                Back
            </Link>
        </form>
    );
}
``
