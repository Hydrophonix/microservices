// Core
import { NestFactory }                                                        from "@nestjs/core";
import { Logger }                                                             from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication }                             from "@nestjs/platform-fastify";
import { Transport }                                                          from "@nestjs/microservices";
import { ConfigService }                                                      from "@nestjs/config";
import fastifyCookie                                                          from "fastify-cookie";
import fastifyHelmet                                                          from "fastify-helmet";
import fastifyCsrf                                                            from "fastify-csrf";
import { AllExceptionsFilter, AppValidationPipe, LoggingInterceptor, Queues } from "@hydro-microservices/common";

// App
import { AppModule } from "./app.module";

// Instruments
import { AppConfig } from "./config";

declare const module: any;

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: false,
        }),
    );
    const configService = app.get<ConfigService<AppConfig>>(ConfigService);
    const appPort = configService.get("APP_PORT");

    app.register(fastifyCookie, {
        secret: configService.get("COOKIE_SECRET"),
    });
    app.register(fastifyHelmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [ "'self'" ],
                styleSrc:   [ "'self'", "'unsafe-inline'" ],
                imgSrc:     [ "'self'", "data:", "validator.swagger.io" ],
                scriptSrc:  [ "'self'", "https: 'unsafe-inline'" ],
            },
        },
    });
    app.register(fastifyCsrf);

    app.enableCors({
        origin: [ // For local frontend app
            "http://localhost:3000",
            "http://localhost:3001",
        ],
        credentials: true,
    });
    app.enableShutdownHooks();
    app.setGlobalPrefix("api");
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(AppValidationPipe);

    const rabbitmqUrl = configService.get("RABBITMQ_URL");
    const login = configService.get("RABBITMQ_LOGIN");
    const password = configService.get("RABBITMQ_PASSWORD");

    console.log("<<=|X|=>> ~ file: main.ts ~ line 19 ~ bootstrap ~ login", login);
    console.log("<<=|X|=>> ~ file: main.ts ~ line 21 ~ bootstrap ~ password", password);

    app.connectMicroservice({
        transport: Transport.RMQ,
        options:   {
            urls:         [ rabbitmqUrl ],
            queue:        Queues.USERS,
            noAck:        false,
            queueOptions: {
                durable: true,
            },
        },
    });
    app.connectMicroservice({
        transport: Transport.RMQ,
        options:   {
            urls:         [ rabbitmqUrl ],
            queue:        Queues.POSTS,
            noAck:        false,
            queueOptions: {
                durable: true,
            },
        },
    });
    app.connectMicroservice({
        transport: Transport.RMQ,
        options:   {
            urls:         [ rabbitmqUrl ],
            queue:        Queues.COMMENTS,
            noAck:        false,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.setGlobalPrefix("api");
    app.enableShutdownHooks();

    await app.listen(appPort, "0.0.0.0");
    await app.startAllMicroservices();

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    Logger.log(`🚀 Nest application started on: http://localhost:${appPort}`, "NestFactory");
    Logger.log("🚀 Nest microservice started", "NestFactory");
}());
