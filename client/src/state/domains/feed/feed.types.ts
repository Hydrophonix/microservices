import { ServerError } from "../../axios-client";

export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface Feed {
    userId: string;
    posts: Post[];
}

export interface FeedState {
    isLoading: boolean;
    posts: Post[];
    userId: string;
    error: ServerError | null;
}
