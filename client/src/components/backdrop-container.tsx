// Core
import { Backdrop, Box, BoxProps, Theme } from "@mui/material";
import { SxProps }                        from "@mui/system";
import { FC }                             from "react";

interface BackdropContainerProps {
    open: boolean;
    sx?: SxProps<Theme>;
    boxProps?: BoxProps;
}

export const BackdropContainer: FC<BackdropContainerProps> = ({ open, sx, children, ...boxProps }) => {
    return (
        <Box
            sx = {{
                position: "relative",
                ...sx,
            }}
            { ...boxProps }>
            <Backdrop
                open = { open }
                sx = {{
                    position: "absolute",
                    zIndex:   (theme) => theme.zIndex.drawer + 1,
                }}
            />
            {children}
        </Box>
    );
};
