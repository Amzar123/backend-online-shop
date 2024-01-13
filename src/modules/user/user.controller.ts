import { Controller, Post, Body, Res, BadRequestException, Get, Query, Patch, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from 'mongoose';
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { ResponseDto } from "src/dto/response.dto";
import { GetQueryDto } from "src/dto/getQueryDto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller('users')
export class UserController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService) {}

    @Post('/one')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res) {
        try {
            const user: any = await this.userService.createUser(createUserDto);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: user,
                message: "success create user",
              });
        
            return res.status(200).json(responseObject);        
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get()
    async getUser(@Query() getQueryDto: GetQueryDto, @Res() res) {
        try {
            const users: any = await this.userService.getUsers(getQueryDto);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: users,
                message: "success get users",
                total: users.length
              });
        
            return res.status(200).json(responseObject);        
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Patch("/one/:id")
    async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto, @Res() res) {
        try {
            const user: any = await this.userService.updateUser(id, updateUser);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: user,
                message: "success update users",
              });
        
            return res.status(200).json(responseObject);   
        
              return res.status(200).json(responseObject);  
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}