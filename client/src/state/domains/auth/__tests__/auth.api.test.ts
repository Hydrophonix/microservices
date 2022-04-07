// Instruments
import { authAPI }       from "../auth.api";
import { axiosClient }   from "../../../axios-client";
import { SignInPayload } from "../auth.types";

jest.mock("../../../axios-client");

describe("auth API", () => {
    describe("signIn", () => {
        const payload: SignInPayload = {
            email:    "test",
            password: "test",
        };

        test("should call axios client", () => {
            authAPI.signIn(payload);

            expect(axiosClient.post).toBeCalledWith("/auth/signin", payload);
        });
    });

    // And so on...
});
