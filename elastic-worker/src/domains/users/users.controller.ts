// Core
import { Controller }                 from "@nestjs/common";
import { EventPattern, Payload }      from "@nestjs/microservices";
import { Subjects, UserCreatedEvent } from "@hydro-microservices/common";

@Controller()
export class UsersController {
    @EventPattern(Subjects.UserCreated)
    userCreated(@Payload() data: UserCreatedEvent) {
        console.log("<<=|X|=>> ~ file: users.controller.ts ~ line 10 ~ UsersController ~ userCreated ~ data", data);
    }
}
