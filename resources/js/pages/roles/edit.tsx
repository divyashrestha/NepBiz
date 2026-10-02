import RoleForm from './partials/role-form';
import { Permission, Role } from '@/types';

export default function Edit({
    role,
    permissions,
}: {
    role: Role;
    permissions: Permission[];
}) {
    return <RoleForm role={role} permissions={permissions} />;
}
