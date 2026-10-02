import AppLayout from '@/layouts/app-layout';
import permissions from "@/routes/permissions";
import {Link} from "@inertiajs/react";
import {Permission} from "@/types";

export default function Show({ permission }:{permission: Permission}) {
    return (

            <div className="p-6">

                <h1 className="text-2xl font-bold mb-4">
                    Permission Details
                </h1>

                <div className="space-y-2">
                    <p>
                        <strong>Name:</strong> {permission.name}
                    </p>

                    <p>
                        <strong>Guard:</strong> {permission.guard_name}
                    </p>
                </div>

                <Link href={permissions.index()} className={'btn mx-2'}>
                    Back
                </Link>
            </div>

    );
}
