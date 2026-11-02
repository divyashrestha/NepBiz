import React from 'react';

export type CustomChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type CustomSubmitEvent = React.SubmitEvent<HTMLFormElement>;
export type CustomPagination = {
    current_page: number;
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
export type CustomFilter = { search: string };
export type UsedUnusedStats = { used: number; unused: number };
export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};
