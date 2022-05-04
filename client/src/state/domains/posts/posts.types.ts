import { ServerError } from "../../axios-client";

export interface Post {
    id: string;
    userId?: string;
    title: string;
    content: string;
    comments: string[];
}

export interface PostsState {
    loading: boolean;
    error: ServerError | null;
    edit: Post | null;
}

export interface CreatePostPayload {
    title: string;
    content: string;
}
