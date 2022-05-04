// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { normalizeError } from "../../../utils";
import { commentsAPI }    from "../comments.api";
import { comments }       from "../comments.slice";

export function* callFindCommentsWorker({ payload }: PayloadAction<string>) {
    try {
        const { data }: SagaReturnType<typeof commentsAPI.find> = yield call(commentsAPI.find, payload);

        yield put(comments.findSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(comments.createError(serverError));
    }
}
