// Core
import { Box, Button, TextField } from "@mui/material";
import { FC, useState }           from "react";

// Instruments
import { posts, useAppDispatch } from "../../state";
import { comments }              from "../../state/domains/comments";

interface PostControlPanelProps {
    postId: string;
    userId?: string;
}

export const PostControlPanel: FC<PostControlPanelProps> = ({ postId, userId }) => {
    const dispatch = useAppDispatch();

    const [ comment, setComment ] = useState("");

    const handleAddComment = () => {
        dispatch(comments.create({
            content: comment,
            postId,
            userId,
        }));
        setComment("");
    };

    return (
        <Box sx = {{
            display:        "flex",
            justifyContent: "space-between",
            width:          "100%",
            alignItems:     "center" }}>
            <Box sx = {{
                display:    "flex",
                alignItems: "center" }}>
                <TextField
                    size = "small"
                    sx = {{ marginRight: 1 }}
                    value = { comment }
                    onChange = { (event) => setComment(event.target.value) }
                />
                <Button
                    variant = "contained"
                    onClick = { handleAddComment }>
                    ADD COMMENT
                </Button>
            </Box>
            <Button
                color = "error"
                variant = "contained"
                onClick = { () => dispatch(posts.delete(postId)) }>
                DELETE POST
            </Button>
        </Box>
    );
};
