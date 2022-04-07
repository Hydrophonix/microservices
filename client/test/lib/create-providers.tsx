// Core
import { FC }            from "react";
import { Provider }      from "react-redux";
import { ThemeProvider } from "@mui/material";

// Instruments
import { createStore }   from "./create-store";
import { TestRootState } from "./types";
import { defaultTheme }  from "../../src/assets";

export const createProviders = (preloadedState?: TestRootState): FC => {
    const store = createStore(preloadedState);

    return ({ children }) => {
        return (
            <Provider store = { store }>
                <ThemeProvider theme = { defaultTheme }>
                    {children}
                </ThemeProvider>
            </Provider>
        );
    };
};
