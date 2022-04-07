/* eslint-disable @typescript-eslint/no-unused-vars */
// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Instruments
import {
    CreateUserPayload,
    FindUsersPayload,
    FindUsersResponse,
    SortBy,
    SortOrder,
    UpdateUserPayload,
    User,
    UsersState,
} from "./users.types";

const initialState: UsersState = {
    isLoading: false,
    list:      [],
    edit:      null,
    // pagination
    skip:      0,
    limit:     10,
    count:     0,
    page:      0,
    // search
    sort:      SortBy.id,
    order:     SortOrder.asc,
};

export const { actions: users, reducer: usersReducer } = createSlice({
    name:     "users",
    initialState,
    reducers: {
        get(state, _action: PayloadAction<string>) {
            state.isLoading = true;
        },
        getSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.edit = action.payload;
        },
        getError(state) {
            state.isLoading = false;
            state.edit = null;
        },


        find(state, { payload }: PayloadAction<FindUsersPayload|undefined>) {
            state.isLoading = true;
            state.limit = payload?.limit ?? state.limit;
            state.skip = payload?.skip ?? state.skip;
            state.order = payload?.order ?? state.order;
            state.sort = payload?.sort ?? state.sort;
            state.page = state.skip / state.limit;
        },
        findSuccess(state, { payload }: PayloadAction<FindUsersResponse>) {
            state.isLoading = false;
            state.list = payload.results;
            state.count = payload.count;
        },
        findError(state) {
            state.isLoading = false;
        },


        create(state, _action: PayloadAction<CreateUserPayload>) {
            state.isLoading = true;
        },
        createSuccess(state, { payload }: PayloadAction<User>) {
            state.isLoading = false;
            state.list.push(payload);
        },
        createError(state) {
            state.isLoading = false;
        },


        update(state, _action: PayloadAction<UpdateUserPayload>) {
            state.isLoading = true;
        },
        updateSuccess(state, { payload }: PayloadAction<User>) {
            state.isLoading = false;
            state.list.forEach((user) => user.id === payload.id ? payload : user);
        },
        updateError(state) {
            state.isLoading = false;
        },


        delete(state, _action: PayloadAction<string>) {
            state.isLoading = true;
        },
        deleteSuccess(state, { payload }: PayloadAction<string>) {
            state.isLoading = false;
            state.list = state.list.filter((user) => user.id !== payload);
        },
        deleteError(state) {
            state.isLoading = false;
        },
    },
});
