import AppLayout from '@/layouts/app-layout';
import PermissionForm from './partials/permission-form';
import {KeyRound, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Create() {
    return (
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <KeyRound/>
                    <h1 className="text-3xl font-bold">
                        Add Permission
                    </h1>
                </div>
                <PermissionForm permission={null} />
            </div>
    );
}
