// Core
import { runSaga } from "redux-saga";

// Instruments
import { callSignOutWorker } from "../sign-out.worker";
import { authAPI }           from "../../auth.api";
import { auth }              from "../../";
import { normalizeError }    from "../../../../utils";

jest.mock("../../auth.api");
jest.mock("../../auth.slice");
jest.mock("../../../../utils");

describe("sign up saga", () => {
    const dispatch = jest.fn();
    const testSaga = async () => {
        await runSaga(
            { dispatch },
            //@ts-ignore
            callSignOutWorker,
        );
    };

    test("should call the api", async () => {
        await testSaga();
        expect(authAPI.signOut).toHaveBeenCalledWith();
    });


    describe("when api responds with success", () => {
        beforeEach(async () => {
            await testSaga();
        });

        test("should create an action", () => {
            expect(auth.signOutSuccess).toHaveBeenCalledWith();
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "signOutSuccess" });
        });
    });


    describe("when api responds with error", () => {
        const error = new Error("test");

        beforeEach(async () => {
            jest.clearAllMocks();

            // eslint-disable-next-line no-extra-parens
            (authAPI.signOut as jest.Mock).mockRejectedValue(error);

            await testSaga();
        });

        test("should normalize error", () => {
            expect(normalizeError).toHaveBeenCalledWith(error);
        });

        test("should create an action", () => {
            expect(auth.signOutError).toHaveBeenCalledWith("normalizeError");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "signOutError" });
        });
    });
});
