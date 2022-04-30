// Core
import { Module } from "@nestjs/common";

// Modules
import { FeedModule } from "../feed/feed.module";

// Controllers
import { PostsController } from "./posts.controller";

@Module({
    imports:     [ FeedModule ],
    controllers: [ PostsController ],
})
export class PostsModule {}
