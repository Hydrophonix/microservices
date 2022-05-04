// Core
import { takeEvery } from "redux-saga/effects";

// Instruments
import { comments }            from "./comments.slice";
import {
    callCreateCommentWorker,
} from "./workers";

export function* watchCommentsAsync() {
    yield takeEvery(comments.create.toString(), callCreateCommentWorker);
}
