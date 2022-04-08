// Core
import { Module } from "@nestjs/common";

// Modules
import { ConfigurationModule } from "./core/configuration";
import { UsersModule }         from "./domains/users/users.module";

@Module({
    imports: [
        ConfigurationModule,
        UsersModule,
    ],
})
export class AppModule {}
