// Core
import { Queues, RABBITMQ_SERVICE }      from "@hydro-microservices/common";
import { FactoryProvider }               from "@nestjs/common";
import { ConfigService }                 from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

// Instruments
import { AppConfig } from "../../config";

export const RabbitmqService: FactoryProvider = {
    provide:    RABBITMQ_SERVICE,
    inject:     [ ConfigService ],
    useFactory: (configService: ConfigService<AppConfig>) => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:   {
                urls:         [ configService.get("RABBITMQ_URL") ],
                queue:        Queues.POSTS,
                queueOptions: {
                    durable: true,
                },
            },
        });
    },
};
