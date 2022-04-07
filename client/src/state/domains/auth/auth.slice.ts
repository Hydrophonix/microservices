// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { ServerError }                                   from "../../axios-client";
import { AuthState, SignInPayload, SignUpPayload, User } from "./auth.types";

export const initialState: AuthState = {
    isLoggedIn:  false,
    isLoading:   true,
    currentUser: null,
    error:       null,
};

export const { actions: auth, reducer: authReducer } = createSlice({
    name:     "auth",
    initialState,
    reducers: {
        signUp(state, _action: PayloadAction<SignUpPayload>) {
            state.isLoading = true;
        },
        signUpSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        signUpError(state, { payload }: PayloadAction<ServerError>) {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = payload;
        },


        signIn(state, _action: PayloadAction<SignInPayload>) {
            state.isLoading = true;
        },
        signInSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        signInError(state, { payload }: PayloadAction<ServerError>) {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = payload;
        },


        getCurrentUser(state) {
            state.isLoading = true;
        },
        getCurrentUserSuccess(state, { payload }: PayloadAction<User>) {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.currentUser = payload;
        },
        getCurrentUserError(state, { payload }: PayloadAction<ServerError>) {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
        },


        signOut(state) {
            state.isLoading = true;
        },
        signOutSuccess(state) {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        signOutError(state, { payload }: PayloadAction<ServerError>) {
            state.isLoading = false;
            state.error = payload;
        },


        clearError(state) {
            state.error = null;
        },
    },
});
