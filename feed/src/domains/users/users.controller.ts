// Core
import { Controller }                             from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { Subjects, UserCreatedEvent }             from "@hydro-microservices/common";

// Services
import { FeedService } from "../feed/feed.service";

@Controller()
export class UsersController {
    constructor(
        private readonly feedService: FeedService,
    ) {}

    @EventPattern(Subjects.UserCreated)
    async userCreated(
        @Payload() data: UserCreatedEvent,
        @Ctx() context: RmqContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<void> {
        await this.feedService.create(data.id);

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);
    }
}
