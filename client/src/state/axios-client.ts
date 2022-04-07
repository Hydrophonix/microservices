// Core
import axios from "axios";

export interface ServerError {
    statusCode: number;
    message: string;
    validation?: Record<string, string[]>;
}

export const axiosClient = axios.create({
    baseURL:         "/api",
    timeout:         2000,
    withCredentials: true,
});

export const axiosError: ServerError = {
    statusCode: 600,
    message:    "Network error",
};
