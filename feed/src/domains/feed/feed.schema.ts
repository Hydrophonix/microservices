// Core
import { randomBytes }                 from "crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types }             from "mongoose";


// Instruments
// import { Role } from "../../core/auth/role.enum";

class Post extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: false, type: [ String ]})
    likes: string[];
}

const PostSchema = SchemaFactory.createForClass(Post);

@Schema()
export class Feed extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: PostSchema })
    posts: Post[];
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
