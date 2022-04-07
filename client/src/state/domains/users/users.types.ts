export interface User {
    id: string;
    username: string;
    email: string;
    // Todo: change to enum from common lib
    role: string;
}

export enum SortOrder {
    asc = "asc",
    desc = "desc",
}

export enum SortBy {
    username = "username",
    role = "role",
    id="_id",
    email="email",
}

export interface UsersState {
    list: User[];
    isLoading: boolean;
    edit: User | null;
    // pagination
    skip: number;
    limit: number;
    count: number;
    page: number;
    // search params
    order: SortOrder;
    sort: SortBy;
}


export interface CreateUserPayload {
    username: string;
    email: string;
    password: string;
}


export interface FindUsersPayload {
    skip?: number;
    limit?: number;
    order?: SortOrder;
    sort?: SortBy;
}

export interface FindUsersParams {
    skip: number;
    limit: number;
    order: SortOrder;
    sort: SortBy;
}

export interface FindUsersResponse {
    count: number;
    results: User[];
}


export interface UpdateUser {
    username: string;
    email: string;
}

export interface UpdateUserPayload {
    id: string;
    data: UpdateUser;
}
