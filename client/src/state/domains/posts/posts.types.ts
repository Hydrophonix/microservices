import { ServerError } from "../../axios-client";
import { Comment }     from "../comments/comments.types";

export interface Post {
    id: string;
    userId?: string;
    title: string;
    content: string;
    comments: Comment[];
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
