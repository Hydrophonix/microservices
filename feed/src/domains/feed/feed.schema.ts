// Core
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document }                    from "mongoose";
import { Post, PostSchema }            from "../posts/post.schema";

@Schema()
export class Feed extends Document {
    @Prop({ required: true, unique: true })
    userId: string;

    @Prop({ type: [ PostSchema ]})
    posts: Post[];
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
