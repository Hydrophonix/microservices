// Core
import { Body, Controller, Post, UseGuards, UseInterceptors }    from "@nestjs/common";
import { CurrentUser, JwtAuthGuard, SerializeInterceptor, User } from "@hydro-microservices/common";

// Services
import { PostsService }           from "./posts.service";
import { CreatePostDto, PostDto } from "./dto";
import { Post as PostDoc }        from "./posts.schema";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) {}

    @Post()
    @UseInterceptors(new SerializeInterceptor(PostDto))
    async create(
        @CurrentUser() { id }: User,
        @Body() createPostDto: CreatePostDto, // eslint-disable-line @typescript-eslint/indent
    ): Promise<PostDoc> {
        const doc = await this.postsService.create(id, createPostDto);

        return doc;
    }
}
