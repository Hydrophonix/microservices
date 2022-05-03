// Core
import { Module }         from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// Controllers
import { CommentsController } from "./comments.controller";

// Services
import { RabbitmqService } from "../../core/rabbitmq";
import { CommentsService } from "./comments.service";

// Instruments
import { Comment, CommentSchema } from "./comments.schema";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Comment.name, schema: CommentSchema }],
        ),
    ],
    providers: [
        CommentsService,
        RabbitmqService,
    ],
    controllers: [ CommentsController ],
})
export class CommentsModule {}
