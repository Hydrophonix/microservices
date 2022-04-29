// Core
import { ParseObjectIdPipe }      from "@hydro-microservices/common";
import { Controller, Get, Param } from "@nestjs/common";

// Services
import { FeedService } from "./feed.service";

@Controller("feed")
export class FeedController {
    constructor(
        private readonly feedService: FeedService,
    ) {}

    @Get("all")
    getAll() {
        return this.feedService.getAll();
    }


    @Get(":id")
    getOne(@Param("id", ParseObjectIdPipe) id: string) {
        return this.feedService.findOne(id);
    }
}
