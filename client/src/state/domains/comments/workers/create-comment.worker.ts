// Core
import { PayloadAction }                     from "@reduxjs/toolkit";
import { call, put, SagaReturnType, select } from "redux-saga/effects";

// Instruments
import { CreateCommentPayload } from "../comments.types";
import { commentsAPI }          from "../comments.api";
import { comments }             from "../comments.slice";
import { normalizeError }       from "../../../utils";
import { RootState }            from "../../../store";

export function* callCreateCommentWorker({ payload }: PayloadAction<CreateCommentPayload>) {
    try {
        let userId = payload.userId;

        userId ??= yield select((state: RootState) => state.feed.userId);

        const { data }: SagaReturnType<typeof commentsAPI.create> = yield call(
            commentsAPI.create,
            { ...payload, userId },
        );

        yield put(comments.createSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(comments.createError(serverError));
    }
}
