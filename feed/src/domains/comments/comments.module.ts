// Core
import { Module } from "@nestjs/common";

// Modules
import { FeedModule } from "../feed/feed.module";

// Controllers
import { CommentsController } from "./comments.controller";

@Module({
    imports:     [ FeedModule ],
    controllers: [ CommentsController ],
})
export class CommentsModule {}
