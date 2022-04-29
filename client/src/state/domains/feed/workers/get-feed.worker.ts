// Core
import { call, put, SagaReturnType, select } from "redux-saga/effects";
import { PayloadAction }                     from "@reduxjs/toolkit";

// Instruments
import { feedAPI }        from "../feed.api";
import { feed }           from "..";
import { normalizeError } from "../../../utils";
import { RootState }      from "../../../store";

export function* callGetFeedWorker({ payload }: PayloadAction<string|undefined>) {
    let id = payload;

    id ??= yield select((state: RootState) => state.auth.currentUser?.id);

    try {
        const { data }: SagaReturnType<typeof feedAPI.getOne> = yield call(feedAPI.getOne, id);
        console.log("<<=|X|=>> ~ file: get.worker.ts ~ line 12 ~ function*callGetFeedWorker ~ data", data);

        yield put(feed.getSuccess(data));
    } catch (error) {
        const serverError = normalizeError(error);

        yield put(feed.getError(serverError));
    }
}
