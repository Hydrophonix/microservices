// Core
import axios from "axios";

// Instruments
import { normalizeError }          from "../utils";
import { ServerError, axiosError } from "../axios-client";

describe("store utils", () => {
    describe("normalizeError", () => {
        let isAxiosErrorSpy = jest.spyOn(axios, "isAxiosError");
        let serverError: ServerError;
        const error = { response: { data: {
            statusCode: "statusCode",
            message:    "message",
            validation: "validation",
        }}};

        const getTestResult = (error: unknown) => {
            serverError = normalizeError(error);
        };

        test("should call axios.isAxiosError", () => {
            getTestResult(error);

            expect(isAxiosErrorSpy).toHaveBeenCalledWith(error);
        });


        describe("when error is AxiosError", () => {
            beforeEach(() => {
                isAxiosErrorSpy = jest.spyOn(axios, "isAxiosError").mockReturnValue(true);
                getTestResult(error);
            });

            test("should return normalized error", () => {
                expect(serverError).toEqual(error.response.data);
            });
        });


        describe("when error is not AxiosError", () => {
            beforeEach(() => {
                isAxiosErrorSpy = jest.spyOn(axios, "isAxiosError").mockReturnValue(false);
                getTestResult(error);
            });

            test("should return normalized error", () => {
                expect(serverError).toEqual(axiosError);
            });
        });
    });
});
