// Core
import { FastifyRequest } from "fastify";

// Instruments
import { User } from "./user.interface";

export interface RequestWithUser extends FastifyRequest {
    user: User;
}
