import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/entities/user.entity";
import { UserController } from "./user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}