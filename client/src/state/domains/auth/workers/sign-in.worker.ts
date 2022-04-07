// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { authAPI }        from "../auth.api";
import { auth }           from "../";
import { SignInPayload }  from "../auth.types";
import { normalizeError } from "../../../utils";

export function* callSignInWorker(action: PayloadAction<SignInPayload>) {
    try {
        const { data }: SagaReturnType<typeof authAPI.signIn> = yield call(authAPI.signIn, action.payload);

        yield put(auth.signInSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(auth.signInError(serverError));
    }
}
