// Core
import { put }               from "redux-saga/effects";
import axios, { AxiosError } from "axios";
import { Action }            from "@reduxjs/toolkit";

// Instruments
import { axiosError, ServerError } from "./axios-client";

export function* catchErrorWorker<T>(error: unknown, handler: (error: ServerError) => Action<T>) {
    if (!axios.isAxiosError(error)) {
        yield put(handler(axiosError));
    }

    const serverError = error as AxiosError<ServerError>;

    yield put(handler({
        statusCode: serverError.response!.data.statusCode,
        message:    serverError.response!.data.message,
        validation: serverError.response!.data.validation,
    }));
}
