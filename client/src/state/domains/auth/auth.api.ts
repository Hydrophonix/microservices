// Core
import { AxiosResponse } from "axios";

// Instruments
import { axiosClient }                        from "../../axios-client";
import { SignInPayload, SignUpPayload, User } from "./auth.types";

export const authAPI = Object.freeze({
    signIn: (data: SignInPayload) => axiosClient
        .post<SignInPayload, AxiosResponse<User>>("/auth/signin", data),

    signUp: (data: SignUpPayload) => axiosClient
        .post<SignUpPayload, AxiosResponse<User>>("/auth/signup", data),

    signOut: () => axiosClient
        .post("/auth/signout"),

    getCurrentUser: () => axiosClient
        .get<User>("/auth/current-user"),
});
