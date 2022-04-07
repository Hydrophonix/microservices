// Core
import { PayloadAction }                   from "@reduxjs/toolkit";
import { call, put, SagaReturnType, take } from "redux-saga/effects";

// Instruments
import { ui }               from "../../ui";
import { catchErrorWorker } from "../../../catch-error.worker";
import { deleteUserAPI }    from "../users.api";
import { users }            from "../users.slice";

export function* callDeleteUserWorker({ payload }: PayloadAction<string>) {
    yield put(ui.openConfirmationalModal({
        title:   "Delete user",
        content: "This changes cannot be reverted. Are you sure?",
    }));

    const action: SagaReturnType<typeof ui.modalConfirm|typeof ui.modalCancel> = yield take([
        ui.modalConfirm.toString(),
        ui.modalCancel.toString(),
    ]);

    if (action.type === ui.modalCancel.toString()) {
        return;
    }

    try {
        yield call(deleteUserAPI, payload);

        yield put(users.deleteSuccess(payload));
    } catch (error) {
        yield* catchErrorWorker(error, users.deleteError);
    }
}
