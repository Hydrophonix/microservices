// Instruments
import { AxiosResponse } from "axios";

// Instruments
import { axiosClient }                   from "../../axios-client";
import { Comment, CreateCommentPayload } from "./comments.types";

export const commentsAPI = Object.freeze({
    create: (data: CreateCommentPayload) => axiosClient
        .post<CreateCommentPayload, AxiosResponse<Comment>>("/comments", data),

    find: (postId: string) => axiosClient
        .get<Comment[]>(`/comments/${postId}`),

    delete: (id: string) => axiosClient
        .delete(`/comments/${id}`),
});
