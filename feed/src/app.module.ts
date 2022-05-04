// Core
import { Module } from "@nestjs/common";

// Modules
import { DatabaseModule }      from "./core/database";
import { ConfigurationModule } from "./core/configuration";
import { CommentsModule } from './domains/comments/comments.module';
import { PostsModule }         from "./domains/posts/posts.module";
import { FeedModule }          from "./domains/feed/feed.module";
import { UsersModule }         from "./domains/users/users.module";

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        UsersModule,
        FeedModule,
        PostsModule,
        CommentsModule,
    ],
})
export class AppModule {}
