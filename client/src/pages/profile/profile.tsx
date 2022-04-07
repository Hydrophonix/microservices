// Core
import { Box, Grid, Button, Card } from "@mui/material";
import { FC }                      from "react";

// Elements
import { PageHeader } from "../../elements";

// Instruments
import { auth, useAppDispatch, useAppSelector } from "../../state";

export const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);

    const handleSignOut = () => dispatch(auth.signOut());

    return (
        <Card sx = {{ minWidth: "50%", padding: 2 }}>
            <PageHeader>
                Profile
            </PageHeader>

            <Grid
                container
                spacing = { 2 }
                sx = {{ paddingX: 2 }}>
                <Grid
                    item
                    xs = { 4 }>
                    Username:
                </Grid>

                <Grid
                    item
                    xs = { 8 }>
                    {user?.username}
                </Grid>

                <Grid
                    item
                    xs = { 4 }>
                    Role:
                </Grid>

                <Grid
                    item
                    xs = { 8 }>
                    {user?.role}
                </Grid>

                <Grid
                    item
                    xs = { 4 }>
                    Email:
                </Grid>

                <Grid
                    item
                    xs = { 8 }>
                    {user?.email}
                </Grid>
            </Grid>

            <Box sx = {{
                display:        "flex",
                justifyContent: "center",
                padding:        2,
            }}>
                <Button
                    variant = "contained"
                    onClick = { handleSignOut }>
                    Sign Out
                </Button>
            </Box>
        </Card>
    );
};
