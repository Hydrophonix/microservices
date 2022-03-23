// Core
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from "@nestjs/common";
import { Observable }     from "rxjs";
import { tap }            from "rxjs/operators";
import { FastifyRequest } from "fastify";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const logger = new Logger("Request");
        const req = context.switchToHttp().getRequest<FastifyRequest>();

        return next
            .handle()
            .pipe(
                tap(() => {
                    logger.log(`Method: ${req.method}, Url: ${req.url}`);
                }),
            );
    }
}
