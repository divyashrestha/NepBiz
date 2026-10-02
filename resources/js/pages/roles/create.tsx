import RoleForm from './partials/role-form';

export default function Create({permissions,}: { permissions: any }) {
    return (
        <RoleForm permissions={permissions} role={undefined}/>
    );
}
