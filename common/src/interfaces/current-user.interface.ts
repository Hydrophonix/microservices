// Instruments
import { Role } from "../enums";

export interface CurrentUser {
    id: string;
    username: string;
    email: string;
    role: Role;
}