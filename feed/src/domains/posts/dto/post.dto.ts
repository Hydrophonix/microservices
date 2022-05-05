// Core
import { Expose, Type } from "class-transformer";

// Instruments
import { CommentDto } from "../../comments/dto";

export class PostDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    @Type(() => CommentDto)
    comments: CommentDto[];
}
