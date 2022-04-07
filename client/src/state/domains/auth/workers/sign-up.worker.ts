// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { authAPI }        from "../auth.api";
import { auth }           from "../";
import { SignUpPayload }  from "../auth.types";
import { normalizeError } from "../../../utils";

export function* callSignUpWorker({ payload }: PayloadAction<SignUpPayload>) {
    try {
        const { data }: SagaReturnType<typeof authAPI.signUp> = yield call(authAPI.signUp, payload);

        yield put(auth.signUpSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(auth.signUpError(serverError));
    }
}
