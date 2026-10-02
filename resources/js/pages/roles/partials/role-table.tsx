import RoleActions from '@/components/roles/role-actions';
import {Role} from "@/types";

export default function RoleTable({roles,}: { roles: Role[] }) {
    return (
        <table className="w-full">

            <thead>
            <tr>
                <th>Name</th>
                <th>Permissions</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {roles.map((role: Role) => (
                <tr key={role.id}>
                    <td>{role.name}</td>

                    <td>
                        {role.permissions_count}
                    </td>

                    <td>
                        <RoleActions role={role}/>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
    );
}
