// Core
import { Box, Button, TextField }         from "@mui/material";
import { FC, FormEventHandler, useState } from "react";

// Components
import { PageBackHeader }                        from "../../components/page-header";
import { PageContainer }                         from "../../elements";
import { useAppDispatch, useAppSelector, users } from "../../state";

export const CreateUserPage: FC = () => {
    const dispatch = useAppDispatch();
    const serverError = useAppSelector((state) => state.auth.error);

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        dispatch(
            users.create({
                username,
                email,
                password,
            }),
        );
    };

    return (
        <PageContainer>
            <PageBackHeader>
                Create User
            </PageBackHeader>

            <Box
                autoComplete = "off"
                component = "form"
                sx = {{
                    display:       "flex",
                    alignItems:    "center",
                    flexDirection: "column",
                }}
                onSubmit = { handleFormSubmit }>

                <TextField
                    required
                    error = { Boolean(serverError?.validation?.username) }
                    helperText = { serverError?.validation?.username }
                    label = "Username"
                    margin = "dense"
                    value = { username }
                    variant = "outlined"
                    onChange = { (event) => setUsername(event.target.value) }
                />

                <TextField
                    required
                    error = { Boolean(serverError?.validation?.email) }
                    helperText = { serverError?.validation?.email }
                    label = "Email"
                    margin = "dense"
                    type = "email"
                    value = { email }
                    variant = "outlined"
                    onChange = { (event) => setEmail(event.target.value) }
                />

                <TextField
                    required
                    error = { Boolean(serverError?.validation?.password) }
                    helperText = { serverError?.validation?.password }
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
                    Create User
                </Button>
            </Box>
        </PageContainer>
    );
};
