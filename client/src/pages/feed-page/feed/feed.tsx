// Core
import { Box, CircularProgress, Typography } from "@mui/material";
import { FC }                                from "react";

// Instruments
import { useAppSelector } from "../../../state";
import { Post }           from "./post";

export const Feed: FC = () => {
    const { isLoading, posts } = useAppSelector((state) => state.feed);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    if (!posts.length) {
        return (
            <Typography
                align = "center"
                variant = "h5">
                There is no posts yet...
            </Typography>
        );
    }

    return (
        <Box sx = {{
            minWidth:       "65%",
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center" }}>
            {posts.map((post) => (
                <Post
                    key = { post.id }
                    post = { post }
                />
            ))}
        </Box>
    );
};
