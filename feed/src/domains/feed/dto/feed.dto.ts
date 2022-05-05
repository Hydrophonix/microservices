// Core
import { ApiProperty }             from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";

// Instruments
import { PostDto } from "../../posts/dto";


export class FeedDto {
    @Expose()
    @Transform((objectId) => objectId.obj.id.toString())
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    userId: string;

    @Expose()
    @Type(() => PostDto)
    @ApiProperty()
    posts: PostDto[];
}
