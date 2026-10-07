import { User } from '@/types/auth';
import { CustomPagination } from '@/types/custom';
import { Role } from '@/types/roles';

export type UserTableData = User & {
    roles: Role[];
    roles_count: number;
};

export type UserIndex = CustomPagination & {
    data: UserTableData[];
};

export type UserFilter = {
    search: string;
};

export type UserStatus = {
    roles_count: number;
    users_count: number;
};
