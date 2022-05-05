// Core
import {
    IsMongoId,
    IsNotEmpty,
    IsString,
    MaxLength,
} from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    postId: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    content: string;
}
