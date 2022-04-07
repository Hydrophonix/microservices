// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { getUserAPI } from "../users.api";
import { users }      from "../users.slice";

export function* callGetUserWorker({ payload }: PayloadAction<string>) {
    try {
        const { status, data }: SagaReturnType<typeof getUserAPI> = yield call(getUserAPI, payload);

        if (status === 200) {
            yield put(users.getSuccess(data));
        } else {
            yield put(users.getError());
        }
    } catch (error) {
        yield put(users.getError());
    }
}
