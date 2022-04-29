// Core
import { FactoryProvider }               from "@nestjs/common";
import { ConfigService }                 from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

// Instruments
import { AppConfig } from "../../config";

export const RabbitmqProvider: FactoryProvider = {
    provide:    "RABBITMQ_SERVICE",
    inject:     [ ConfigService ],
    useFactory: (configService: ConfigService<AppConfig>) => {
        const host = configService.get("RABBITMQ_HOST");
        const port = configService.get("RABBITMQ_PORT");
        const user = configService.get("RABBITMQ_LOGIN");
        const password = configService.get("RABBITMQ_PASSWORD");
        const queue = configService.get("RABBITMQ_QUEUE");

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:   {
                urls:         [ `amqp://${user}:${password}@${host}:${port}` ],
                queue,
                queueOptions: {
                    durable: true,
                },
            },
        });
    },
};
