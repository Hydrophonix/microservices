import { ServerError } from "../../axios-client";

export interface User {
    id: string;
    username: string;
    email: string;
    // Todo: change to enum from common lib
    role: string;
}

export interface SignUpPayload {
    username: string;
    email: string;
    password: string;
}

export interface SignInPayload {
    email: string;
    password: string;
}

export interface AuthState {
    isLoggedIn:      boolean;
    isLoading: boolean;
    currentUser: User | null;
    error: ServerError | null;
}
