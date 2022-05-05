// Core
import { Expose } from "class-transformer";

export class CommentDto {
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    username: string;

    @Expose()
    content: string;
}
