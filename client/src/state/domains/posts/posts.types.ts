import { ServerError } from "../../axios-client";

export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface PostsState {
    loading: boolean;
    error: ServerError | null;
}

export interface CreatePostPayload {
    title: string;
    content: string;
}
