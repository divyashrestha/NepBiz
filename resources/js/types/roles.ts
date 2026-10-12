import { Permission } from '@/types/permission';
import { User } from '@/types/auth';
import { CustomPagination } from '@/types/custom';

export type Role = {
    id: number;
    name: string;
    guard_name: string;
};

export type RoleWithPermissionsUsers = Role & {
    permissions: Permission[];
    users: User[];
};

export type RoleWithCounts = Role & {
    permissions_count: number;
    users_count: number;
};

export type RoleWithPermissionsUsersAndCounts = Role &
    RoleWithPermissionsUsers &
    RoleWithCounts;

export type RoleIndex = CustomPagination & {
    data: RoleWithPermissionsUsersAndCounts[];
};
