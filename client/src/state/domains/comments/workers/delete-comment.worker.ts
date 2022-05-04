// Core
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put }     from "redux-saga/effects";

// Instruments
import { commentsAPI }    from "../comments.api";
import { comments }       from "../comments.slice";
import { normalizeError } from "../../../utils";

export function* callDeleteCommentWorker({ payload }: PayloadAction<string>) {
    try {
        yield call(commentsAPI.delete, payload);
        yield put(comments.deleteSuccess(payload));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(comments.deleteError(serverError));
    }
}
