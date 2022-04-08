// Core
import { CacheModule, CACHE_MANAGER, forwardRef, Inject, Module } from "@nestjs/common";
import { ConfigModule, ConfigService }                            from "@nestjs/config";
import { MongooseModule }                                         from "@nestjs/mongoose";
import * as redisStore                                            from "cache-manager-redis-store";

// Modules
import { AuthModule } from "../../core/auth";

// Controllers
import { UsersController } from "./controllers";

// Services
import { RabbitmqProvider } from "../../core/rabbitmq";
import { UsersService }     from "./services";

// Instruments
import { AppConfig }        from "../../config";
import { User, UserSchema } from "./user.schema";
import { RedisCache }       from "./types";

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema }],
        ),
        CacheModule.registerAsync({
            inject:     [ ConfigService ],
            useFactory: (configService: ConfigService<AppConfig>) => ({
                store: redisStore,
                host:  configService.get("REDIS_HOST"),
                port:  configService.get("REDIS_PORT"),
                ttl:   30,
            }),
        }),
        forwardRef(() => AuthModule),
    ],
    controllers: [ UsersController ],
    providers:   [
        RabbitmqProvider,
        UsersService,
    ],
    exports: [ UsersService ],
})
export class UsersModule {
    constructor(
    @Inject(CACHE_MANAGER) cacheManager: RedisCache,
    ) {
        const client = cacheManager.store.getClient();

        client.on("error", (error) =>  {
            console.info(error);
        });
    }
}
