// Core
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put }     from "redux-saga/effects";
import { push }          from "connected-react-router";

// Instruments
import { postsAPI }       from "../posts.api";
import { posts }          from "../posts.slice";
import { normalizeError } from "../../../utils";

export function* callDeletePostWorker({ payload }: PayloadAction<string>) {
    try {
        yield call(postsAPI.delete, payload);
        yield put(posts.deleteSuccess());
        yield put(push("/feed"));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(posts.deleteError(serverError));
    }
}
