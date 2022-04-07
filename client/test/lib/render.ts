// Core
import { render as libRender, RenderOptions } from "@testing-library/react";
import { ReactElement }                       from "react";

// Instruments
import { TestRootState }   from "./types";
import { createProviders } from "./create-providers";

export const render = (
    ui: ReactElement,
    preloadedState?: TestRootState,
    options?: Omit<RenderOptions, "wrapper">,
) => libRender(
    ui,
    {
        wrapper: createProviders(preloadedState),
        ...options,
    },
);
