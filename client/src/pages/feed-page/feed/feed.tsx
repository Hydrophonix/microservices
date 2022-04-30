// Core
import { CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {  AccessTime }                                                    from "@mui/icons-material";
import { FC }                                                             from "react";

// Instruments
import { useAppSelector } from "../../../state";

export const Feed: FC = () => {
    const isLoading = useAppSelector((state) => state.feed.isLoading);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                    <AccessTime/>
                </ListItemAvatar>
                <ListItemText>
                    TYext
                </ListItemText>
            </ListItem>
        </List>
    );
};
