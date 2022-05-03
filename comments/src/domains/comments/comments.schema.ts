// Core
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document }                    from "mongoose";

@Schema()
export class Comment extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    postId: string;

    @Prop({ required: true })
    content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
