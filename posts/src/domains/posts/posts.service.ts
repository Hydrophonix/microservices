// Core
import { Injectable }   from "@nestjs/common";
import { InjectModel }  from "@nestjs/mongoose";
import { Model }        from "mongoose";
import { DeleteResult } from "mongodb";

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

    findOneById(id: string): Promise<Post> {
        return this.postModel.findById(id).exec();
    }

    deleteOneById(id: string): Promise<DeleteResult> {
        return this.postModel.deleteOne({ _id: id }).exec();
    }
}
