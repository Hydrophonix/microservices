// Core
import { Injectable }   from "@nestjs/common";
import { InjectModel }  from "@nestjs/mongoose";
import { DeleteResult } from "mongodb";
import { Model }        from "mongoose";

// Instruments
import { Comment }          from "./comments.schema";
import { CreateCommentDto } from "./dto";

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<Comment>,
    ) {}

    create(userId: string, username: string, createCommentDTO: CreateCommentDto): Promise<Comment> {
        return this.commentModel.create({ ...createCommentDTO, userId, username });
    }

    findMany(postId: string, userId): Promise<Comment[]> {
        return this.commentModel.find({ postId, userId }).exec();
    }

    findOneById(id: string): Promise<Comment> {
        return this.commentModel.findById(id).exec();
    }

    deleteOneById(id: string): Promise<DeleteResult> {
        return this.commentModel.deleteOne({ _id: id }).exec();
    }
}
