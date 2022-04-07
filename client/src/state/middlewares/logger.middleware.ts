// Core
import { createLogger } from "redux-logger";

export const loggerMiddleware = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => "#139BFE",
        prevState: () => "#1C5FAF",
        action:    () => "#149945",
        nextState: () => "#A47104",
        error:     () => "#FF0005",
    },
});
