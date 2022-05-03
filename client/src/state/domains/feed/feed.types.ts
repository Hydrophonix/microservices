import { ServerError } from "../../axios-client";
import { Post }        from "../posts/posts.types";

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
