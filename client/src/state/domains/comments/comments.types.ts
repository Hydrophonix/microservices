import { ServerError } from "../../axios-client";

export interface Comment {
    id: string;
    content: string;
    username: string;
    userId: string;
}

export interface CommentsState {
    loading: boolean;
    list: Comment[];
    error: ServerError | null;
}

export interface CreateCommentPayload {
    postId: string;
    content: string;
}
