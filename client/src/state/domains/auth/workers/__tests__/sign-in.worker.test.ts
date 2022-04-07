// Core
import { runSaga }       from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

// Instruments
import { callSignInWorker } from "../sign-in.worker";
import { authAPI }          from "../../auth.api";
import { auth }             from "../../";
import { normalizeError }   from "../../../../utils";
import { SignInPayload }    from "../../auth.types";

jest.mock("../../auth.api");
jest.mock("../../auth.slice");
jest.mock("../../../../utils");

describe("sign in saga", () => {
    const dispatch = jest.fn();
    const action: PayloadAction<SignInPayload> = {
        type:    "test",
        payload: {
            email:    "testerino",
            password: "paswordino",
        },
    };
    const testSaga = async (action: PayloadAction<SignInPayload>) => {
        await runSaga(
            { dispatch },
            //@ts-ignore
            callSignInWorker,
            action,
        );
    };

    test("should call the api", async () => {
        await testSaga(action);

        expect(authAPI.signIn).toHaveBeenCalledWith(action.payload);
    });


    describe("when api responds with success", () => {
        beforeEach(async () => {
            await testSaga(action);
        });

        test("should create an action", () => {
            expect(auth.signInSuccess).toHaveBeenCalledWith("signIn");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "signInSuccess" });
        });
    });


    describe("when api responds with error", () => {
        const error = new Error("test");

        beforeEach(async () => {
            jest.clearAllMocks();

            // eslint-disable-next-line no-extra-parens
            (authAPI.signIn as jest.Mock).mockRejectedValue(error);

            await testSaga(action);
        });

        test("should normalize error", () => {
            expect(normalizeError).toHaveBeenCalledWith(error);
        });

        test("should create an action", () => {
            expect(auth.signInError).toHaveBeenCalledWith("normalizeError");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "signInError" });
        });
    });
});
