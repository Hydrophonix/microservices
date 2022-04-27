// Core
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Instruments
import { RequestWithUser } from "../interfaces";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<RequestWithUser>();

        return request.user;
    },
);
