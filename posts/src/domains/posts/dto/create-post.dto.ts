// Core
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    content: string;
}
