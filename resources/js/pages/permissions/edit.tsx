import AppLayout from '@/layouts/app-layout';
import PermissionForm from './partials/permission-form';
import {KeyRound} from "lucide-react";
import {Permission} from "@/types";

export default function Edit({ permission }:{permission: Permission}) {
    return (
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <KeyRound/>
                    <h1 className="text-3xl font-bold">
                        Edit Permission
                    </h1>
                </div>
                <PermissionForm permission={permission} />
            </div>
    );
}
