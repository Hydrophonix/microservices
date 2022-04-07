// Core
import { AxiosResponse } from "axios";

// Instruments
import { axiosClient } from "../../axios-client";
import {
    User,
    CreateUserPayload,
    FindUsersParams,
    FindUsersResponse,
    UpdateUser,
} from "./users.types";

export const findUsersAPI = (params: FindUsersParams) => axiosClient
    .get<FindUsersResponse>("/users", { params });

export const getUserAPI = (userId: string) => axiosClient
    .get<User>(`/users/${userId}`);

export const deleteUserAPI = (userId: string) => axiosClient
    .delete(`/users/${userId}`);

export const updateUserAPI = (userId: string, data: UpdateUser) => axiosClient
    .put<UpdateUser, AxiosResponse<User>>(`/users/${userId}`, data);

export const createUserAPI = (data: CreateUserPayload) => axiosClient
    .post<CreateUserPayload, AxiosResponse<User>>("/users", data);
