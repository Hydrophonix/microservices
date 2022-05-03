export interface AppConfig {
    APP_PORT: number;
    DATABASE_URI: string;
    NODE_ENV: string;
    IS_PROD: boolean;
    JWT_SECRET: string;
    COOKIE_SECRET: string;
    RABBITMQ_LOGIN: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_HOST: string;
    RABBITMQ_PORT: string;
    RABBITMQ_URL: string;
}

export default (): AppConfig => {
    const RABBITMQ_LOGIN = process.env.RABBITMQ_LOGIN;
    const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
    const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
    const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

    return {
        APP_PORT:      3000,
        DATABASE_URI:  process.env.DATABASE_URI || "mongodb://localhost:27017/nest-boilerplate",
        NODE_ENV:      process.env.NODE_ENV || "development",
        IS_PROD:       process.env.NODE_ENV === "production",
        JWT_SECRET:    process.env.JWT_SECRET || "test-secret",
        COOKIE_SECRET: process.env.COOKIE_SECRET || "test-cookie-secret",
        RABBITMQ_LOGIN,
        RABBITMQ_PASSWORD,
        RABBITMQ_HOST,
        RABBITMQ_PORT,
        RABBITMQ_URL:  `amqp://${RABBITMQ_LOGIN}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
    };
};
