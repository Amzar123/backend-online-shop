import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.userRepo.createUser(createUserDto);
    }

    // async getCategory(getQueryDto: GetQueryDto) {
    //     return await this.categoryRepo.createCategory(getQueryDto);
    // }

    // async getCategoryById(id) {
    //     return await this.categoryRepo.getOneById(id);
    // }
}