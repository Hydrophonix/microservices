// Core
import { Box, Button, TextField } from "@mui/material";
import { FC, useState }           from "react";
import { posts, useAppDispatch }  from "../../state";

interface PostControlPanelProps {
    postId: string;
}

export const PostControlPanel: FC<PostControlPanelProps> = ({ postId }) => {
    const dispatch = useAppDispatch();

    const [ comment, setComment ] = useState("");

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
                <Button variant = "contained">
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
