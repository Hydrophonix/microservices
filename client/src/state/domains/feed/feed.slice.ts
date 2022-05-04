// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { ServerError }     from "../../axios-client";
import { Feed, FeedState } from "./feed.types";

export const initialState: FeedState = {
    id:        "",
    isLoading: true,
    userId:    "",
    posts:     [],
    error:     null,
};

export const { actions: feed, reducer: feedReducer } = createSlice({
    name:     "feed",
    initialState,
    reducers: {
        get(state, _action: PayloadAction<string|undefined>) {
            state.isLoading = true;
        },
        getSuccess(state, { payload }: PayloadAction<Feed>) {
            state.isLoading = false;
            state.error = null;
            state.userId = payload.userId;
            state.posts = payload.posts;
            state.id = payload.id;
        },
        getError(state, { payload }: PayloadAction<ServerError>) {
            state.isLoading = false;
            state.userId = "";
            state.posts = [];
            state.id = "";
            state.error = payload;
        },
    },
});
