// Core
import { ApiProperty }             from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";

// Instruments

class Post {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    comments: string[];
}

export class FeedDto {
    @Expose()
    @Transform((objectId) => objectId.obj.id.toString())
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    userId: string;

    @Expose()
    @Type(() => Post)
    @ApiProperty()
    posts: Post[];
}
