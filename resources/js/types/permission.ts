import { CustomPagination } from '@/types/custom';

export type Permission = {
    id: number;
    name: string;
    guard_name: string;
};

export type PermissionWithRoleCount = Permission & {
    roles_count: number;
};

export type PermissionIndex = CustomPagination & {
    data: PermissionWithRoleCount[];
};
