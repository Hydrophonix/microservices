// Instruments
import { axiosError }                      from "../../../axios-client";
import { authReducer, auth, initialState } from "../auth.slice";
import { AuthState }                       from "../auth.types";

describe("auth slice", () => {
    describe("signUp", () => {
        const payload = {
            email:    "test",
            password: "test",
            username: "test",
        };
        const action = auth.signUp(payload);
        const updatedState = authReducer({
            ...initialState,
            isLoading: false,
        }, action);
        const expectedState: AuthState = {
            ...initialState,
            isLoading: true,
        };

        test("should update state", () => {
            expect(updatedState).toEqual(expectedState);
        });
    });

    describe("signUpSuccess", () => {
        const payload = {
            email:    "test",
            id:       "test",
            role:     "test",
            username: "test",
        };
        const action = auth.signUpSuccess(payload);
        const updatedState = authReducer(initialState, action);
        const expectedState: AuthState = {
            ...initialState,
            isLoggedIn:  true,
            currentUser: payload,
            isLoading:   false,
        };

        test("should update state", () => {
            expect(updatedState).toEqual(expectedState);
        });
    });


    describe("signUpError", () => {
        const action = auth.signUpError(axiosError);
        const updatedState = authReducer({
            ...initialState,
            isLoading: true,
        }, action);
        const expectedState: AuthState  = {
            ...initialState,
            isLoading: false,
            error:     axiosError,
        };

        test("should update state", () => {
            expect(updatedState).toEqual(expectedState);
        });
    });

    // And so on...
});
