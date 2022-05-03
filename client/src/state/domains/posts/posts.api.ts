// Instruments
import { AxiosResponse } from "axios";

// Instruments
import { axiosClient }             from "../../axios-client";
import { Post, CreatePostPayload } from "./posts.types";

export const postsAPI = Object.freeze({
    create: (data: CreatePostPayload) => axiosClient
        .post<CreatePostPayload, AxiosResponse<Post>>("/posts", data),

    get: (id: string) => axiosClient
        .get<Post>(`/posts/${id}`),

    delete: (id: string) => axiosClient
        .delete(`/posts/${id}`),
});
