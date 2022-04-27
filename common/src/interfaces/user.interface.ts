// Instruments
import { Role } from "../enums";

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
}