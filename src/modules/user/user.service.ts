import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/createUser.dto";
import { GetQueryDto } from "src/dto/getQueryDto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ClientSession, Schema as MongooseSchema, Types } from "mongoose";

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.userRepo.createUser(createUserDto);
    }

    async getUsers(getQueryDto: GetQueryDto) {
        return await this.userRepo.getUsers(getQueryDto);
    }

    async updateUser(id: string, updateUser: UpdateUserDto) {
        return await this.userRepo.updateUser(id, updateUser);
    }

    // async getCategoryById(id) {
    //     return await this.categoryRepo.getOneById(id);
    // }
}