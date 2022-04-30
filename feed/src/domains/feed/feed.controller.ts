// Core
import { ParseObjectIdPipe, SerializeInterceptor } from "@hydro-microservices/common";
import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";

// Services
import { FeedService } from "./feed.service";

// Instruments
import { FeedDto } from "./dto";

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
    @UseInterceptors(new SerializeInterceptor(FeedDto))
    getOne(@Param("id", ParseObjectIdPipe) id: string) {
        return this.feedService.findOneByUserId(id);
    }
}
