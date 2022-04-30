// Core
import { FactoryProvider }               from "@nestjs/common";
import { ConfigService }                 from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Queues, RABBITMQ_SERVICE }      from "@hydro-microservices/common";

// Instruments
import { AppConfig } from "../../config";

export const RabbitmqProvider: FactoryProvider = {
    provide:    RABBITMQ_SERVICE,
    inject:     [ ConfigService ],
    useFactory: (configService: ConfigService<AppConfig>) => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:   {
                urls:         [ configService.get("RABBITMQ_URL") ],
                queue:        Queues.USERS,
                queueOptions: {
                    durable: true,
                },
            },
        });
    },
};
