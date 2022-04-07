// Core
import { configureStore } from "@reduxjs/toolkit";

// Instruments
import { uiReducer }     from "../../src/state/domains/ui/ui.slice";
import { authReducer }   from "../../src/state/domains/auth/auth.slice";
import { usersReducer }  from "../../src/state/domains/users/users.slice";
import { TestRootState } from "./types";

export const createStore = (preloadedState?: TestRootState) => configureStore({
    reducer: {
        auth:  authReducer,
        ui:    uiReducer,
        users: usersReducer,
    },
    devTools:   false,
    middleware: [],
    preloadedState,
});
