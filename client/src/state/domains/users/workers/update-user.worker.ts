// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { updateUserAPI }     from "../users.api";
import { users }             from "../users.slice";
import { UpdateUserPayload } from "../users.types";

export function* callUpdateUserWorker({ payload }: PayloadAction<UpdateUserPayload>) {
    try {
        const { status, data }: SagaReturnType<typeof updateUserAPI> = yield call(
            updateUserAPI,
            payload.id,
            payload.data,
        );

        if (status !== 200) {
            throw new Error("Something went wrong");
        }

        yield put(users.updateSuccess(data));
    } catch (error) {
        yield put(users.updateError());
    }
}
