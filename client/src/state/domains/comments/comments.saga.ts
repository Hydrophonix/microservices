// Core
import { takeEvery } from "redux-saga/effects";

// Instruments
import { comments }           from "./comments.slice";
import {
    callCreateCommentWorker,
    callDeleteCommentWorker,
    callFindCommentsWorker,
} from "./workers";

export function* watchCommentsAsync() {
    yield takeEvery(comments.create.toString(), callCreateCommentWorker);
    yield takeEvery(comments.delete.toString(), callDeleteCommentWorker);
    yield takeEvery(comments.find.toString(), callFindCommentsWorker);
}
