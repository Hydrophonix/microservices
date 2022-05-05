// Core
import { Box, Typography } from "@mui/material";
import { FC }              from "react";

// Instruments
import { ServerError } from "../state/axios-client";

interface ErrorProps {
    error: ServerError;
}

export const Error: FC<ErrorProps> = ({ error }) => {
    return (
        <Box sx = {{ display: "flex", flexDirection: "column" }}>
            <Typography
                color = { (theme) => theme.palette.error.main }
                variant = "h4">
                Error: {error.statusCode}
            </Typography>
            <Typography
                align = "center"
                color = { (theme) => theme.palette.error.dark }
                variant = "subtitle1">
                {error.message}
            </Typography>
        </Box>
    );
};
