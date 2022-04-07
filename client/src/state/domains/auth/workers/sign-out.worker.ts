// Core
import { call, put } from "redux-saga/effects";

// Instruments
import { authAPI }        from "../auth.api";
import { auth }           from "../";
import { normalizeError } from "../../../utils";

export function* callSignOutWorker() {
    try {
        yield call(authAPI.signOut);

        yield put(auth.signOutSuccess());
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(auth.signOutError(serverError));
    }
}
