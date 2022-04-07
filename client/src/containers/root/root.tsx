// Core
import { FC }              from "react";
import { Provider }        from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider }   from "@mui/material";

// Containers
import { App }               from "../app";
import { ConfirmationModal } from "../confirmational-modal";

// Instruments
import { store }        from "../../state/store";
import { history }      from "../../state/history";
import { defaultTheme } from "../../assets";

export const Root: FC = () => {
    return (
        <Provider store = { store }>
            <ThemeProvider theme = { defaultTheme }>
                <ConnectedRouter history = { history }>
                    <App />
                    <ConfirmationModal />
                </ConnectedRouter>
            </ThemeProvider>
        </Provider>
    );
};
