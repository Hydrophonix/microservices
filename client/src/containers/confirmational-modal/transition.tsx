// Core
import { forwardRef, ReactElement, Ref } from "react";
import { Slide }                         from "@mui/material";
import { TransitionProps }               from "@mui/material/transitions";

export const Transition = forwardRef(
    (
        props: TransitionProps & {
            children: ReactElement<any, any>;
        },
        ref: Ref<unknown>,
    ) => (
        <Slide
            direction = "up"
            ref = { ref }
            { ...props }
        />
    ),
);
