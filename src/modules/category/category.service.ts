import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/repositories/category.repository";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Schema as MongooseSchema, Types } from "mongoose";

@Injectable()
export class CategoryService {
    constructor(private categoryRepo: CategoryRepository) {}

    async createCategory(createCategoryDto: CreateCategoryDto) {
        return await this.categoryRepo.createCategory(createCategoryDto);
    }

    // async getCategory(getQueryDto: GetQueryDto) {
    //     return await this.categoryRepo.createCategory(getQueryDto);
    // }

    async getCategoryById(id) {
        return await this.categoryRepo.getOneById(id);
    }
}