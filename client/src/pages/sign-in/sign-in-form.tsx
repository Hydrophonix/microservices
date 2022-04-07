// Core
import { FC, useState, FormEventHandler } from "react";
import { Box, Button, TextField }         from "@mui/material";

// State
import { auth, useAppDispatch } from "../../state";

export const SignInForm: FC = () => {
    const dispatch = useAppDispatch();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        dispatch(auth.signIn({
            email,
            password,
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
                label = "Email"
                margin = "dense"
                type = "email"
                value = { email }
                variant = "outlined"
                onChange = { (event) => setEmail(event.target.value) }
            />

            <TextField
                required
                label = "Password"
                margin = "dense"
                type = "password"
                value = { password }
                variant = "outlined"
                onChange = { (event) => setPassword(event.target.value) }
            />

            <Button
                sx = {{ marginTop: 3 }}
                type = "submit"
                variant = "contained">
                Sign In
            </Button>
        </Box>
    );
};
