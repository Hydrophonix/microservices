// Core
import { Module }         from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// Services
import { FeedService } from "./feed.service";

// Controllers
import { FeedController } from "./feed.controller";

// Instruments
import { Feed, FeedSchema } from "./feed.schema";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Feed.name, schema: FeedSchema }],
        ),
    ],
    providers:   [ FeedService ],
    exports:     [ FeedService ],
    controllers: [ FeedController ],
})
export class FeedModule {}
