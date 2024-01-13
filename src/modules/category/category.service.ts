import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/repositories/category.repository";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Schema as MongooseSchema, Types } from "mongoose";
import { GetQueryDto } from "src/dto/getQueryDto";

@Injectable()
export class CategoryService {
    constructor(private categoryRepo: CategoryRepository) {}

    async createCategory(createCategoryDto: CreateCategoryDto) {
        return await this.categoryRepo.createCategory(createCategoryDto);
    }

    async getCategories(getQueryDto: GetQueryDto) {
        return await this.categoryRepo.getCategories(getQueryDto);
    }

    async getCategoryById(id: string) {
        return await this.categoryRepo.getOneById(id);
    }
}