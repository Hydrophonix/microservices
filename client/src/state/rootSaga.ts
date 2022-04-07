// Core
import { all, fork } from "@redux-saga/core/effects";

// Sagas
import { watchAuthAsync }  from "./domains/auth/auth.saga";
import { watchUsersAsync } from "./domains/users/users.saga";

export function* rootSaga() {
    yield all([
        fork(watchAuthAsync),
        fork(watchUsersAsync),
    ]);
}
