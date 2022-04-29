// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { ServerError }                   from "../../axios-client";
import { CreatePostPayload, PostsState } from "./posts.types";

export const initialState: PostsState = {
    loading: true,
    error:   null,
};

export const { actions: posts, reducer: postsReducer } = createSlice({
    name:     "posts",
    initialState,
    reducers: {
        create(state, _action: PayloadAction<CreatePostPayload>) {
            state.loading = true;
        },
        createSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        createError(state, { payload }: PayloadAction<ServerError>) {
            state.loading = false;
            state.error = payload;
        },
    },
});
