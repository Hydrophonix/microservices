// Core
import { Injectable }  from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";

// Instruments
import { Post }          from "./posts.schema";
import { CreatePostDto } from "./dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private readonly postModel: Model<Post>,
    ) {}

    create(userId: string, createPostDTO: CreatePostDto): Promise<Post> {
        return this.postModel.create({ userId, ...createPostDTO });
    }
}
