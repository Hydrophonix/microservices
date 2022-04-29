// Core
import { FC, useState, FormEventHandler } from "react";
import { Box, Button, TextField }         from "@mui/material";

// State
import { posts, useAppDispatch } from "../../state";

export const CreatePostForm: FC = () => {
    const dispatch = useAppDispatch();

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");


    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        dispatch(posts.create({
            title,
            content,
        }));
    };


    return (
        <Box
            autoComplete = "off"
            component = "form"
            sx = {{
                display:       "flex",
                flexDirection: "column",
            }}
            onSubmit = { handleFormSubmit }>

            <TextField
                required
                label = "Title"
                margin = "dense"
                value = { title }
                variant = "outlined"
                onChange = { (event) => setTitle(event.target.value) }
            />

            <TextField
                required
                label = "Content"
                margin = "dense"
                value = { content }
                variant = "outlined"
                onChange = { (event) => setContent(event.target.value) }
            />

            <Button
                sx = {{ marginTop: 3 }}
                type = "submit"
                variant = "contained">
                Create
            </Button>
        </Box>
    );
};
