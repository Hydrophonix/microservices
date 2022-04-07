// Core
import { FC } from "react";
import {
    ChevronLeft,
    Home,
} from "@mui/icons-material";
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useHistory } from "react-router";

// State
import { useAppDispatch, useAppSelector, ui } from "../../state";

// Styles
import { DrawerHeader, sideBarWidth } from "./styles";

export const SideBar: FC = () => {
    const { push } = useHistory();
    const dispatch = useAppDispatch();
    const isMenuOpen = useAppSelector((store) => store.ui.isMenuOpen);

    const handleCloseMenu = () => dispatch(ui.closeMenu());

    return (
        <Drawer
            anchor = "left"
            open = { isMenuOpen }
            sx = {{
                width:                sideBarWidth,
                flexShrink:           0,
                "& .MuiDrawer-paper": {
                    width:     sideBarWidth,
                    boxSizing: "border-box",
                },
            }}
            variant = "persistent">
            <DrawerHeader>
                <IconButton onClick = { handleCloseMenu }>
                    <ChevronLeft/>
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem
                    button
                    onClick = { () => push("/") }>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText>
                        Home
                    </ListItemText>
                </ListItem>
                <ListItem
                    button
                    onClick = { () => push("/feed") }>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText>
                        Feed
                    </ListItemText>
                </ListItem>
                <ListItem
                    button
                    onClick = { () => push("/users") }>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText>
                        Users
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
};
