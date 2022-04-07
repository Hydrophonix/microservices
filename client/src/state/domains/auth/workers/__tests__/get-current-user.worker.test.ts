// Core
import { runSaga } from "redux-saga";

// Instruments
import { normalizeError }           from "../../../../utils";
import { auth }                     from "../../";
import { authAPI }                  from "../../auth.api";
import { callGetCurrentUserWorker } from "../get-current-user.worker";

jest.mock("../../auth.api");
jest.mock("../../auth.slice");
jest.mock("../../../../utils");

describe("get current user saga", () => {
    const dispatch = jest.fn();
    const testSaga = async () => {
        await runSaga(
            { dispatch },
            //@ts-ignore
            callGetCurrentUserWorker,
        );
    };

    test("should call the api", async () => {
        await testSaga();

        expect(authAPI.getCurrentUser).toHaveBeenCalled();
    });


    describe("when api responds with success", () => {
        beforeEach(async () => {
            await testSaga();
        });

        test("should create an action", () => {
            expect(auth.getCurrentUserSuccess).toHaveBeenCalledWith("getCurrentUser");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "getCurrentUserSuccess" });
        });
    });


    describe("when api responds with error", () => {
        const error = new Error("test");

        beforeEach(async () => {
            jest.clearAllMocks();

            // eslint-disable-next-line no-extra-parens
            (authAPI.getCurrentUser as jest.Mock).mockRejectedValue(error);

            await testSaga();
        });

        test("should normalize error", () => {
            expect(normalizeError).toHaveBeenCalledWith(error);
        });

        test("should create an action", () => {
            expect(auth.getCurrentUserError).toHaveBeenCalledWith("normalizeError");
        });

        test("should dispatch an action", () => {
            expect(dispatch).toHaveBeenCalledWith({ type: "getCurrentUserError" });
        });
    });
});
