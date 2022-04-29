// Core
import { Module }         from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// Controllers
import { PostsController } from "./posts.controller";

// Services
import { PostsService } from "./posts.service";

// Instruments
import { Post, PostSchema } from "./posts.schema";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Post.name, schema: PostSchema }],
        ),
    ],
    providers:   [ PostsService ],
    controllers: [ PostsController ],
})
export class PostsModule {}
