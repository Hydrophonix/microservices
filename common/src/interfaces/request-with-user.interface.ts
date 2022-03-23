// Core
import { FastifyRequest } from "fastify";

// Instruments
import { Role } from "../enums";

export interface RequestWithUser extends FastifyRequest {
    user:  {
        id: string;
        username: string;
        email: string;
        role: Role;
    };
}
