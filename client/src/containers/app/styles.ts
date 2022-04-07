// Core
import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    styled,
} from "@mui/material";

export const sideBarWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create([ "margin", "width" ], {
        easing:   theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...open && {
        width:      `calc(100% - ${sideBarWidth}px)`,
        marginLeft: `${sideBarWidth}px`,
        transition: theme.transitions.create([ "margin", "width" ], {
            easing:   theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const DrawerHeader = styled("div", {})(({ theme }) => ({
    display:        "flex",
    alignItems:     "center",
    justifyContent: "flex-end",
    padding:        theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export const ContentContainer = styled("div", {})(({ theme }) => ({
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",

    // width:   "100%",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow:   1,
    padding:    theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing:   theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...open && {
        transition: theme.transitions.create("margin", {
            easing:   theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${sideBarWidth}px`,
    },
}));
