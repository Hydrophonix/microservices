// Core
import { configureStore }   from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";

// Instruments
import { rootReducer }                      from "./rootReducer";
import { rootSaga }                         from "./rootSaga";
import { loggerMiddleware, sagaMiddleware } from "./middlewares";
import { history }                          from "./history";

// TODO: update webpack config
const isDev = true;

export const store = configureStore({
    reducer:    rootReducer,
    devTools:   isDev,
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware({ thunk: false });

        const middleware = defaultMiddleware.concat([
            sagaMiddleware,
            routerMiddleware(history),
        ]);

        isDev && middleware.push(loggerMiddleware);

        return middleware;
    },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

