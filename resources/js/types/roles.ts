import { Permission } from '@/types/permission';
import {User} from "@/types/auth";

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

export type RoleIndex = {
    current_page: number;
    data: RoleWithPermissionsUsersAndCounts[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: [];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
};
