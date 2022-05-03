// Core
import { takeEvery } from "redux-saga/effects";

// Instruments
import { posts }         from "./posts.slice";
import {
    callCreatePostWorker,
    callDeletePostWorker,
    callGetPostWorker,
} from "./workers";

export function* watchPostsAsync() {
    yield takeEvery(posts.create.toString(), callCreatePostWorker);
    yield takeEvery(posts.delete.toString(), callDeletePostWorker);
    yield takeEvery(posts.get.toString(), callGetPostWorker);
}
