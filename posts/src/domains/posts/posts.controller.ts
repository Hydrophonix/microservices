// Core
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
}    from "@nestjs/common";
import {
    CurrentUser,
    JwtAuthGuard,
    ParseObjectIdPipe,
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


    @Get(":id")
    @UseInterceptors(new SerializeInterceptor(PostDto))
    async findOne(@Param("id", ParseObjectIdPipe) id: string): Promise<PostDoc> {
        const post = await this.postsService.findOneById(id);

        if (!post) {
            throw new NotFoundException("Post not found");
        }

        return post;
    }


    @Delete(":id")
    async deleteOne(@Param("id", ParseObjectIdPipe) id: string) {
        const { deletedCount } = await this.postsService.deleteOneById(id);

        if (deletedCount !== 1) {
            throw new NotFoundException("User not found");
        }
    }
}
