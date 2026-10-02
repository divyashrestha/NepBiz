import { Permission } from '@/types/permission';

export type Role = {
    id: number;
    name: string;
    guard_name: string;
    roles_count: number;
    permissions: Permission[];
    permissions_count?: number;
};
export type RoleIndex = {
    current_page: number;
    data: Role[];
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
