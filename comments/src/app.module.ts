// Core
import { Module } from "@nestjs/common";

// Modules
import { ConfigurationModule } from "./core/configuration";
import { DatabaseModule }      from "./core/database";
import { CommentsModule }      from "./domains/comments/comments.module";

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        CommentsModule,
    ],
})
export class AppModule {}
