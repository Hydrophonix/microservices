// Core
import { Module } from "@nestjs/common";

// Modules
import { ConfigurationModule } from "./core/configuration";
import { PostsModule }         from "./domains/posts/posts.module";
import { DatabaseModule }      from "./core/database";
import { JwtStrategy }         from "./core/strategies";

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        PostsModule,
    ],
    providers: [ JwtStrategy ],
})
export class AppModule {}
