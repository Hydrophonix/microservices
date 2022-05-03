// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { ServerError }                         from "../../axios-client";
import { CreatePostPayload, Post, PostsState } from "./posts.types";

export const initialState: PostsState = {
    loading: false,
    error:   null,
    edit:    null,
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


        get(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        getSuccess(state, { payload }: PayloadAction<Post>) {
            state.edit = payload;
            state.loading = false;
            state.error = null;
        },
        getError(state, { payload }: PayloadAction<ServerError>) {
            state.loading = false;
            state.edit = null;
            state.error = payload;
        },


        delete(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        deleteSuccess(state) {
            state.loading = false;
            state.error = null;
            state.edit = null;
        },
        deleteError(state, { payload }: PayloadAction<ServerError>) {
            state.loading = false;
            state.error = payload;
        },
    },
});
