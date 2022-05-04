// Core
import { PayloadAction }             from "@reduxjs/toolkit";
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { CreateCommentPayload } from "../comments.types";
import { commentsAPI }          from "../comments.api";
import { comments }             from "../comments.slice";
import { normalizeError }       from "../../../utils";

export function* callCreateCommentWorker({ payload }: PayloadAction<CreateCommentPayload>) {
    try {
        // const;
        const { data }: SagaReturnType<typeof commentsAPI.create> = yield call(commentsAPI.create, payload);

        yield put(comments.createSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(comments.createError(serverError));
    }
}
