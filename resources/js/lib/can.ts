import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props;

    return {
        can: (permission: string) =>
            auth.isSuperAdmin || auth.permissions.includes(permission) || false,
    };
}
