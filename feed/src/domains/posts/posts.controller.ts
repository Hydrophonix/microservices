// Core
import { Controller, NotFoundException }                from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext }       from "@nestjs/microservices";
import { PostCreatedEvent, PostDeletedEvent, Subjects } from "@hydro-microservices/common";

// Services
import { FeedService } from "../feed/feed.service";

@Controller()
export class PostsController {
    constructor(
        private readonly feedService: FeedService,
    ) {}


    @EventPattern(Subjects.PostCreated)
    async postCreated(
        @Payload() data: PostCreatedEvent,
        @Ctx() context: RmqContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<void> {
        const feed = await this.feedService.findOneByUserId(data.userId);

        if (!feed) {
            throw new NotFoundException(`Feed for user:${data.userId} not found`);
        }

        feed.set({
            posts: [
                ...feed.posts,
                {
                    id:      data.id,
                    title:   data.title,
                    content: data.content,
                },
            ],
        });

        await feed.save();

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);
    }


    @EventPattern(Subjects.PostDeleted)
    async postDeleted(
        @Payload() data: PostDeletedEvent,
        @Ctx() context: RmqContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<void> {
        const feed = await this.feedService.findOneByUserId(data.userId);

        if (!feed) {
            throw new NotFoundException(`Feed for user:${data.userId} not found`);
        }

        feed.set({
            posts: feed.posts.filter((post) => post.id !== data.id),
        });

        await feed.save();

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);
    }
}
