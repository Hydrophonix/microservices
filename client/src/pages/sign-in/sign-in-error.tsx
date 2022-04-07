// Core
import { Typography } from "@mui/material";
import { FC }         from "react";

// State
import { useAppSelector } from "../../state";

export const SignInError: FC = () => {
    const serverError = useAppSelector((state) => state.auth.error);

    const visibility = serverError ? "visible" : "hidden";
    const message = serverError?.statusCode === 401
        ? "Incorrect email or password"
        : "Something went wrong";


    return (
        <Typography sx = {{
            visibility,
            color: "error.dark" }}>
            {message}
        </Typography>
    );
};
