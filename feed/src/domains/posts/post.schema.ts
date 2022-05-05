// Core
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document }                    from "mongoose";
import { CommentSchema, Comment }      from "../comments/comment.schema";

@Schema({ _id: false })
export class Post extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: [ CommentSchema ]})
    comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
