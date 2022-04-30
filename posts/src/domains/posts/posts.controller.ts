// Core
import {
    Body,
    Controller,
    Inject,
    Post,
    UseGuards,
    UseInterceptors,
}    from "@nestjs/common";
import {
    CurrentUser,
    JwtAuthGuard,
    PostCreatedEvent,
    RABBITMQ_SERVICE,
    SerializeInterceptor,
    Subjects,
    User,
} from "@hydro-microservices/common";
import { ClientProxy } from "@nestjs/microservices";

// Services
import { PostsService }           from "./posts.service";
import { CreatePostDto, PostDto } from "./dto";
import { Post as PostDoc }        from "./posts.schema";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(
        @Inject(RABBITMQ_SERVICE)
        private readonly rabbitmqService: ClientProxy,
        private readonly postsService: PostsService,
    ) {}

    @Post()
    @UseInterceptors(new SerializeInterceptor(PostDto))
    async create(
        @CurrentUser() { id }: User,
        @Body() createPostDto: CreatePostDto, // eslint-disable-line @typescript-eslint/indent
    ): Promise<PostDoc> {
        const post = await this.postsService.create(id, createPostDto);

        this.rabbitmqService.emit<Subjects.UserCreated, PostCreatedEvent>(Subjects.PostCreated, {
            id:      post._id,
            userId:  post.userId,
            title:   post.title,
            content: post.content,
        });

        return post;
    }
}
