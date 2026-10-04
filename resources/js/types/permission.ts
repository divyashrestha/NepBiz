export type Permission = {
    id: number;
    name: string;
    guard_name: string;
};

export type PermissionWithRoleCount = Permission & {
    roles_count: number;
};
export type PermissionIndex = {
    current_page: number;
    data: PermissionWithRoleCount[];
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
