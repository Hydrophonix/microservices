// Core
import axios, { AxiosError } from "axios";

// Instruments
import { axiosError, ServerError } from "./axios-client";

export const normalizeError = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        return axiosError;
    }

    const serverError = error as AxiosError<ServerError>;

    return {
        statusCode: serverError.response!.data.statusCode,
        message:    serverError.response!.data.message,
        validation: serverError.response!.data.validation,
    };
};
