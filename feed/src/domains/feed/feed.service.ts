// Core
import { Injectable }  from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";

// Instruments
import { Feed } from "./feed.schema";

@Injectable()
export class FeedService {
    constructor(
        @InjectModel(Feed.name)
        private readonly feedModel: Model<Feed>,
    ) {}


    create(userId: string) {
        return this.feedModel.create({ userId });
    }


    getAll() {
        return this.feedModel.find();
    }

    findOne(id: string) {
        return this.feedModel.findById(id);
    }
}
