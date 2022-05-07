// Core
import { CommentCreatedEvent, CommentDeletedEvent, Subjects } from "@hydro-microservices/common";
import { Controller, NotFoundException }                      from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext }             from "@nestjs/microservices";

// Services
import { FeedService } from "../feed/feed.service";
import { Comment }     from "./comment.schema";

@Controller("comments")
export class CommentsController {
    constructor(
        private readonly feedService: FeedService,
    ) {}


    @EventPattern(Subjects.CommentCreated)
    async commentCreated(
        @Payload() data: CommentCreatedEvent,
        @Ctx() context: RmqContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<void> {
        const feed = await this.feedService.findOneByUserId(data.feedOwnerId);

        if (!feed) {
            throw new NotFoundException(`Feed for user:${data.feedOwnerId} not found`);
        }

        const post = feed.posts.find((post) => post.id === data.postId);

        if (!post) {
            throw new NotFoundException(`Post for user:${data.feedOwnerId} not found`);
        }

        const posts = feed.posts.map((post) => {
            if (post.id === data.postId) {
                post.comments.push({
                    id:       data.id,
                    userId:   data.userId,
                    username: data.username,
                    content:  data.content,
                } as Comment);
            }

            return post;
        });

        feed.set({ posts });

        await feed.save();

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);
    }


    @EventPattern(Subjects.CommentDeleted)
    async commentDeleted(
        @Payload() data: CommentDeletedEvent,
        @Ctx() context: RmqContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<void> {
        const feed = await this.feedService.findOneByUserId(data.feedOwnerId);

        if (!feed) {
            throw new NotFoundException(`Feed for user:${data.feedOwnerId} not found`);
        }

        const post = feed.posts.find((post) => post.id === data.postId);

        if (!post) {
            throw new NotFoundException(`Post for user:${data.feedOwnerId} not found`);
        }

        const posts = feed.posts.map((post) => {
            if (post.id === data.postId) {
                post.comments = post.comments.filter((comment) => comment.id !== data.id);
            }

            return post;
        });

        feed.set({ posts });

        await feed.save();

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);
    }
}
