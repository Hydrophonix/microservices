// Core
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put }     from "redux-saga/effects";
import { push }          from "connected-react-router";

// Instruments
import { CreatePostPayload } from "../posts.types";
import { postsAPI }          from "../posts.api";
import { posts }             from "../posts.slice";
import { normalizeError }    from "../../../utils";

export function* callCreatePostWorker({ payload }: PayloadAction<CreatePostPayload>) {
    try {
        yield call(postsAPI.create, payload);
        yield put(posts.createSuccess());
        yield put(push("/feed"));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(posts.createError(serverError));
    }
}
