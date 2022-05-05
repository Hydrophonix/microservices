// Core
import { Module } from "@nestjs/common";

// Modules
import { ConfigurationModule } from "./core/configuration";
import { DatabaseModule }      from "./core/database";
import { JwtStrategy }         from "./core/strategies";
import { CommentsModule }      from "./domains/comments/comments.module";

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        CommentsModule,
    ],
    providers: [ JwtStrategy ],
})
export class AppModule {}
