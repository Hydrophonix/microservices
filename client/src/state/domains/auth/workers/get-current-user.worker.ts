// Core
import { call, put, SagaReturnType } from "redux-saga/effects";

// Instruments
import { authAPI }        from "../auth.api";
import { auth }           from "../";
import { normalizeError } from "../../../utils";

export function* callGetCurrentUserWorker() {
    try {
        const { data }: SagaReturnType<typeof authAPI.getCurrentUser> = yield call(authAPI.getCurrentUser);

        yield put(auth.getCurrentUserSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(auth.getCurrentUserError(serverError));
    }
}
