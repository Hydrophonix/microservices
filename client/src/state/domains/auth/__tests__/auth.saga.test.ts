// Core
import { runSaga, stdChannel } from "redux-saga";
import { auth }                from "..";

// Instruments
import { watchAuthAsync }               from "../auth.saga";
import { SignInPayload, SignUpPayload } from "../auth.types";
import {
    callSignInWorker,
    callSignUpWorker,
    callSignOutWorker,
    callGetCurrentUserWorker,
} from "../workers";

jest.mock("../workers", () => ({
    callSignInWorker:         jest.fn(),
    callSignUpWorker:         jest.fn(),
    callSignOutWorker:        jest.fn(),
    callGetCurrentUserWorker: jest.fn(),
}));

describe("auth saga", () => {
    let channel = stdChannel();

    beforeEach(() => {
        runSaga(
            { channel },
            watchAuthAsync,
        );
    });


    test("should call callSignInWorker", () => {
        const payload = "test" as unknown as SignInPayload;
        const action = auth.signIn(payload);

        channel.put(action);

        expect(callSignInWorker).toHaveBeenCalledWith(action);
    });


    test("should call callSignUpWorker", () => {
        const payload = "test" as unknown as SignUpPayload;
        const action = auth.signUp(payload);

        channel.put(action);

        expect(callSignUpWorker).toHaveBeenCalledWith(action);
    });


    test("should call callSignOutWorker", () => {
        const action = auth.signOut();

        channel.put(action);

        expect(callSignOutWorker).toHaveBeenCalledWith(action);
    });


    test("should call callGetCurrentUserWorker", () => {
        const action = auth.getCurrentUser();

        channel.put(action);

        expect(callGetCurrentUserWorker).toHaveBeenCalledWith(action);
    });
});
