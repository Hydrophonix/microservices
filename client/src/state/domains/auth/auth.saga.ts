// Core
import { takeEvery } from "redux-saga/effects";

// Instruments
import { auth }         from "./auth.slice";
import {
    callGetCurrentUserWorker,
    callSignInWorker,
    callSignOutWorker,
    callSignUpWorker,
} from "./workers";

export function* watchAuthAsync() {
    yield takeEvery(auth.getCurrentUser.toString(), callGetCurrentUserWorker);
    yield takeEvery(auth.signUp.toString(), callSignUpWorker);
    yield takeEvery(auth.signIn.toString(), callSignInWorker);
    yield takeEvery(auth.signOut.toString(), callSignOutWorker);
}
