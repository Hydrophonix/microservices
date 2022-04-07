// Core
import { Typography } from "@mui/material";
import { FC }         from "react";

export const PageHeader: FC = ({ children }) => {
    return (
        <Typography
            align = "center"
            sx = {{ marginBottom: 2 }}
            variant = "h4">
            {children}
        </Typography>

    );
};
