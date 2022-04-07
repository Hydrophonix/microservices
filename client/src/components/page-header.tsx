// Core
import { FC }              from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBack }       from "@mui/icons-material";
import { useHistory }      from "react-router";

// Elements
import { PageHeader } from "../elements";

export const PageBackHeader: FC = ({ children }) => {
    const { goBack } = useHistory();

    return (
        <Box sx = {{
            position:       "relative",
            display:        "flex",
            width:          "100%",
            justifyContent: "center",
        }}>
            <IconButton
                sx = {{
                    position: "absolute",
                    left:     0,
                    top:      0,
                }}
                onClick = { () => goBack() }>
                <ArrowBack />
            </IconButton>

            <PageHeader>
                {children}
            </PageHeader>
        </Box>
    );
};
