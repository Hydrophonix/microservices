// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { postsAPI }       from "../posts.api";
import { posts }          from "../posts.slice";
import { normalizeError } from "../../../utils";

export function* callGetPostWorker({ payload }: PayloadAction<string>) {
    try {
        const { data }: SagaReturnType<typeof postsAPI.get> = yield call(postsAPI.get, payload);

        yield put(posts.getSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(posts.getError(serverError));
    }
}
