// Core
import { Box, Paper, Typography } from "@mui/material";
import { FC }                     from "react";
import { Comment }                from "@mui/icons-material";

// Instruments
import { push }           from "connected-react-router";
import { useAppDispatch } from "../../../state";
import { Post as IPost }  from "../../../state/domains/posts/posts.types";

interface PostProps {
    post: IPost;
}

export const Post: FC<PostProps> = ({ post }) => {
    const dispatch = useAppDispatch();

    return (
        <Paper
            sx = {{
                padding:      2,
                marginBottom: 2,
                ":hover":     {
                    boxShadow: 10, // theme.shadows[20]
                    cursor:    "pointer",
                },
            }}
            onClick = { () => dispatch(push(`/posts/${post.id}`, post)) }>
            <Typography
                align = "center"
                variant = "h6">
                {post.title}
            </Typography>
            <Typography>
                {post.content}
            </Typography>
            <Box sx = {{
                display:        "flex",
                justifyContent: "flex-end",
                marginTop:      1 }}>
                {post.comments.length}
                <Comment />
            </Box>
        </Paper>
    );
};
