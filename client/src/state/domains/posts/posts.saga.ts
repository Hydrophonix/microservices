// Core
import { takeEvery } from "redux-saga/effects";

// Instruments
import { posts }         from "./posts.slice";
import {
    callCreatePostWorker,
    callGetPostWorker,
} from "./workers";

export function* watchPostsAsync() {
    yield takeEvery(posts.create.toString(), callCreatePostWorker);
    yield takeEvery(posts.get.toString(), callGetPostWorker);
}
