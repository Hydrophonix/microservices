// Core
import { NestFactory }                                                        from "@nestjs/core";
import { Logger }                                                             from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication }                             from "@nestjs/platform-fastify";
import { ConfigService }                                                      from "@nestjs/config";
import { SwaggerModule }                                                      from "@nestjs/swagger";
import { Transport }                                                          from "@nestjs/microservices";
import { AllExceptionsFilter, AppValidationPipe, LoggingInterceptor, Queues } from "@hydro-microservices/common";
import fastifyCookie                                                          from "fastify-cookie";
import fastifyHelmet                                                          from "fastify-helmet";
import fastifyCsrf                                                            from "fastify-csrf";

// App
import { AppModule } from "./app.module";

// Instruments
import { AppConfig, getSwaggerConfig } from "./config";

declare const module: any;

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: false,
        }),
    );
    const configService = app.get<ConfigService<AppConfig>>(ConfigService);
    const port = configService.get("APP_PORT");
    const swaggerConfig = getSwaggerConfig();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup("api", app, swaggerDocument);

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

    await app.listen(
        port,
        "0.0.0.0", // for docker
    );
    await app.startAllMicroservices();


    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    Logger.log(`🚀 Nest application started on: http://localhost:${port}`, "NestFactory");
    Logger.log("🚀 Nest microservice started", "NestFactory");
}());
