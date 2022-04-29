// Core
import { takeEvery } from "redux-saga/effects";

// Instruments
import { feed }          from "./feed.slice";
import {
    callGetFeedWorker,
} from "./workers";

export function* watchFeedAsync() {
    yield takeEvery(feed.get.toString(), callGetFeedWorker);
}
