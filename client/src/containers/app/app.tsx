// Core
import { FC }          from "react";
import { CssBaseline } from "@mui/material";

// Components
import { TopBar }    from "./top-bar";
import { SideBar }   from "./side-bar";
import { AppRouter } from "../app-router";

// State
import { useAppSelector } from "../../state";

// Styles
import { ContentContainer, Main } from "./styles";

export const App: FC = () => {
    const isMenuOpen = useAppSelector((store) => store.ui.isMenuOpen);

    return (
        <>
            <CssBaseline />
            <TopBar />
            <SideBar />
            <Main open = { isMenuOpen }>
                <ContentContainer>
                    <AppRouter />
                </ContentContainer>
            </Main>
        </>
    );
};
