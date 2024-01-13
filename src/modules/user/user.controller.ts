import { Controller, Post, Body, Res, BadRequestException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { Response } from 'express';
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller('users')
export class UserController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService) {}

    @Post('/one')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const order: any = await this.userService.createUser(createUserDto);
            return res.status(200).send(order)
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}