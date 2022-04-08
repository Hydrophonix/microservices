// Core
import { NestFactory }                    from "@nestjs/core";
import { Logger }                         from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

// App
import { AppModule } from "./app.module";

// Instruments
import AppConfig from "./config/app-config";

declare const module: any;

(async function bootstrap() {
    const config = AppConfig();
    const host = config.RABBITMQ_HOST;
    const port = config.RABBITMQ_PORT;
    const login = config.RABBITMQ_LOGIN;
    const password = config.RABBITMQ_PASSWORD;
    const queue = config.RABBITMQ_QUEUE;
    console.log("<<=|X|=>> ~ file: main.ts ~ line 19 ~ bootstrap ~ login", login);
    console.log("<<=|X|=>> ~ file: main.ts ~ line 21 ~ bootstrap ~ password", password);

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options:   {
                urls:         [ `amqp://${login}:${password}@${host}:${port}` ],
                queue,
                queueOptions: {
                    durable: true,
                },
            },
        },
    );

    app.enableShutdownHooks();

    await app.listen();

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    Logger.log("🚀 Nest application started", "NestFactory");
}());
