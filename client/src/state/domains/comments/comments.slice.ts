// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { ServerError }                                  from "../../axios-client";
import { Comment, CommentsState, CreateCommentPayload } from "./comments.types";

export const initialState: CommentsState = {
    loading: false,
    error:   null,
    list:    [],
};

export const { actions: comments, reducer: commentsReducer } = createSlice({
    name:     "comments",
    initialState,
    reducers: {
        create(state, _action: PayloadAction<CreateCommentPayload>) {
            state.loading = true;
        },
        createSuccess(state, { payload }: PayloadAction<Comment>) {
            state.loading = false;
            state.error = null;
            state.list.push(payload);
        },
        createError(state, { payload }: PayloadAction<ServerError>) {
            state.loading = false;
            state.error = payload;
        },


        find(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        findSuccess(state, { payload }: PayloadAction<Comment[]>) {
            state.list = payload;
            state.loading = false;
            state.error = null;
        },
        findError(state, { payload }: PayloadAction<ServerError>) {
            state.loading = false;
            state.list = [];
            state.error = payload;
        },


        delete(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        deleteSuccess(state, { payload }: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.list = state.list.filter((comment) => comment.id !== payload);
        },
        deleteError(state, { payload }: PayloadAction<ServerError>) {
            state.loading = false;
            state.error = payload;
        },


        set(state, { payload }: PayloadAction<Comment[]>) {
            state.list = payload;
        },
    },
});
