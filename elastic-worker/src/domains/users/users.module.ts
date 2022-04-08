// Core
import { Module } from "@nestjs/common";

// Controllers
import { UsersController } from "./users.controller";

@Module({
    controllers: [ UsersController ],
})
export class UsersModule {}
