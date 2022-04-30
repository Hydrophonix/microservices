// Core
import { ApiProperty }       from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class PostDto {
    @Expose()
    @Transform((objectId) => objectId.obj.id.toString())
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    userId: string;

    @Expose()
    @ApiProperty()
    title: string;

    @Expose()
    @ApiProperty()
    content: string;
}
