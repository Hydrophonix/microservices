// Core
import { runSaga }       from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { callSignUpWorker } from "../sign-up.worker";
import { authAPI }          from "../../auth.api";
import { auth }             from "../../";
import { normalizeError }   from "../../../../utils";
import { SignUpPayload }    from "../../auth.types";

jest.mock("../../auth.api");
jest.mock("../../auth.slice");
jest.mock("../../../../utils");

describe("sign up saga", () => {
    const dispatch = jest.fn();
    const action: PayloadAction<SignUpPayload> = {
        type:    "test",
        payload: {
            username: "Johny",
            email:    "testeroni",
            password: "paswordino",
        },
    };
    const testSaga = async (action: PayloadAction<SignUpPayload>) => {
        await runSaga(
            { dispatch },
            //@ts-ignore
            callSignUpWorker,
            action,
        );
    };

    test("should call the api", async () => {
        await testSaga(action);
        expect(authAPI.signUp).toHaveBeenCalledWith(action.payload);
    });


    describe("when api responds with success", () => {
        beforeEach(async () => {
            await testSaga(action);
        });

        test("should create an action", () => {
            expect(auth.signUpSuccess).toHaveBeenCalledWith("signUp");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "signUpSuccess" });
        });
    });


    describe("when api responds with error", () => {
        const error = new Error("test");

        beforeEach(async () => {
            jest.clearAllMocks();

            // eslint-disable-next-line no-extra-parens
            (authAPI.signUp as jest.Mock).mockRejectedValue(error);

            await testSaga(action);
        });

        test("should normalize error", () => {
            expect(normalizeError).toHaveBeenCalledWith(error);
        });

        test("should create an action", () => {
            expect(auth.signUpError).toHaveBeenCalledWith("normalizeError");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "signUpError" });
        });
    });
});
