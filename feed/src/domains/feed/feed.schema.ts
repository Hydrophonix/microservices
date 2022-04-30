// Core
import { randomBytes }                 from "crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types }             from "mongoose";


// Instruments
// import { Role } from "../../core/auth/role.enum";

@Schema({ _id: false })
class Post extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: false, type: [ String ]})
    comments: string[];
}

const PostSchema = SchemaFactory.createForClass(Post);

@Schema()
export class Feed extends Document {
    @Prop({ required: true, unique: true })
    userId: string;

    @Prop({ type: [ PostSchema ]})
    posts: Post[];
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
