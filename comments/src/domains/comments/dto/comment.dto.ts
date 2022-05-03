// Core
import { ApiProperty }       from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class CommentDto {
    @Expose()
    @Transform((objectId) => objectId.obj.id.toString())
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    userId: string;

    @Expose()
    @ApiProperty()
    username: string;

    @Expose()
    @ApiProperty()
    postId: string;

    @Expose()
    @ApiProperty()
    content: string;
}
