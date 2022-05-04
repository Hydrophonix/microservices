import { ServerError } from "../../axios-client";
import { Post }        from "../posts/posts.types";

export interface Feed {
    id: string;
    userId: string;
    posts: Post[];
}

export interface FeedState {
    id: string;
    isLoading: boolean;
    posts: Post[];
    userId: string;
    error: ServerError | null;
}
