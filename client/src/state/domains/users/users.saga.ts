// Core
import { takeLatest, takeLeading } from "redux-saga/effects";

// Instruments
import { users }            from "./users.slice";
import {
    callCreateUserWorker,
    callDeleteUserWorker,
    callFindUsersWorker,
    callGetUserWorker,
    callUpdateUserWorker,
} from "./workers";

export function* watchUsersAsync() {
    yield takeLatest(users.find.toString(), callFindUsersWorker);
    yield takeLatest(users.get.toString(), callGetUserWorker);
    yield takeLeading(users.create.toString(), callCreateUserWorker);
    yield takeLeading(users.update.toString(), callUpdateUserWorker);
    yield takeLeading(users.delete.toString(), callDeleteUserWorker);
}
