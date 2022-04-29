// Core
import { Module } from "@nestjs/common";

// Modules
import { FeedModule } from "../feed/feed.module";

// Controllers
import { UsersController } from "./users.controller";

@Module({
    imports:     [ FeedModule ],
    controllers: [ UsersController ],
})
export class UsersModule {}
