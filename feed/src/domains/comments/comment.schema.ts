// Core
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document }                    from "mongoose";

@Schema({ _id: false })
export class Comment extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    username: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
