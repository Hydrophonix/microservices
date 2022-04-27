// Core
import { FastifyRequest } from "fastify";

// Instruments
import { CurrentUser } from "./current-user.interface";

export interface RequestWithUser extends FastifyRequest {
    user: CurrentUser;
}
