// Core
import { FC, useEffect }            from "react";
import { createStructuredSelector } from "reselect";
import {
    IconButton,
    Toolbar,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import { AccountCircle, Menu } from "@mui/icons-material";
import { useHistory }          from "react-router";

// State
import { useAppDispatch, useAppSelector, auth, ui } from "../../state";

// Styles
import { AppBar } from "./styles";

export const TopBar: FC = () => {
    const dispatch = useAppDispatch();
    const { push } = useHistory();
    const { isMenuOpen, isLoading, isLoggedIn } = useAppSelector(
        createStructuredSelector({
            isMenuOpen: (state) => state.ui.isMenuOpen,
            isLoading:  (state) => state.auth.isLoading,
            isLoggedIn: (state) => state.auth.isLoggedIn,
        }),
    );

    useEffect(() => {
        dispatch(auth.getCurrentUser());
    }, [ dispatch ]);

    const handleOpenMenu = () => dispatch(ui.openMenu());
    const handleAccountClick = () => {
        if (isLoggedIn) {
            push("/profile");
        } else {
            push("/signup");
        }
    };

    return (
        <AppBar
            open = { isMenuOpen }
            position = "static">
            <Toolbar>
                <IconButton
                    aria-label = "menu"
                    color = "inherit"
                    edge = "start"
                    size = "large"
                    sx = {{ mr: 2, ...isMenuOpen && { display: "none" }}}
                    onClick = { handleOpenMenu }>
                    <Menu />
                </IconButton>
                <Typography variant = "h6">
                    Microservices
                </Typography>
                <Box sx = {{ flex: 1 }}/>
                {
                    isLoading
                        ? (
                            <CircularProgress color = "inherit"/>
                        )
                        : (
                            <IconButton
                                color = "inherit"
                                onClick = { handleAccountClick }>
                                <AccountCircle fontSize = "large"/>
                            </IconButton>
                        )
                }
            </Toolbar>
        </AppBar>
    );
};
