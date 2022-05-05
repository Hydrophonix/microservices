// Core
import {
    CommentCreatedEvent,
    CommentDeletedEvent,
    CurrentUser,
    JwtAuthGuard,
    ParseObjectIdPipe,
    RABBITMQ_SERVICE,
    SerializeInterceptor,
    Subjects,
    User,
} from "@hydro-microservices/common";
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
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Comment }     from "./comments.schema";

// Services
import { CommentsService } from "./comments.service";

// Instruments
import { CommentDto, CreateCommentDto } from "./dto";

@Controller("comments")
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(
        @Inject(RABBITMQ_SERVICE)
        private readonly rabbitmqService: ClientProxy,
        private readonly commentsService: CommentsService,
    ) {}


    @Post()
    @UseInterceptors(new SerializeInterceptor(CommentDto))
    async create(
        @CurrentUser() user: User,
        @Body() createCommentDto: CreateCommentDto, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Comment> {
        const comment = await this.commentsService.create(user.id, user.username, createCommentDto);

        this.rabbitmqService.emit<Subjects.CommentCreated, CommentCreatedEvent>(Subjects.CommentCreated, {
            id:          comment._id,
            userId:      comment.userId,
            postId:      comment.postId,
            content:     comment.content,
            username:    comment.username,
            feedOwnerId: createCommentDto.userId,
        });

        return comment;
    }


    @Get(":postId")
    @UseInterceptors(new SerializeInterceptor(CommentDto))
    findMany(
        @CurrentUser() user: User,
        @Param("postId", ParseObjectIdPipe) postId: string, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Comment[]> {
        return this.commentsService.findMany(postId, user.id);
    }


    @Delete(":id")
    async deleteOne(
        @CurrentUser() user: User, // eslint-disable-line @typescript-eslint/indent
        @Param("id", ParseObjectIdPipe) id: string,
    ) {
        const comment = await this.commentsService.findOneById(id);
        console.log("<<=|X|=>> ~ file: comments.controller.ts ~ line 86 ~ CommentsController ~ comment", comment);

        if (!comment) {
            throw new NotFoundException("Comment not found");
        }

        const res = await comment.delete();
        console.log("<<=|X|=>> ~ file: comments.controller.ts ~ line 86 ~ CommentsController ~ comment", comment);
        console.log("<<=|X|=>> ~ file: comments.controller.ts ~ line 92 ~ CommentsController ~ res", res);

        this.rabbitmqService.emit<Subjects.CommentDeleted, CommentDeletedEvent>(Subjects.CommentDeleted, {
            id,
            postId: comment.postId,
            userId: user.id,
        });
    }
}
