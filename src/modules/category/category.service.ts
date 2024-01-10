import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/repositories/category.repository";
import { CreateCategoryDto } from "./dto/createProduct.dto";

@Injectable()
export class CategoryService {
    constructor(private categoryRepo: CategoryRepository) {}

    async createCategory(createCategoryDto: CreateCategoryDto) {
        return await this.categoryRepo.createCategory(createCategoryDto);
    }

    // async getCategory(getQueryDto: GetQueryDto) {
    //     return await this.categoryRepo.createCategory(getQueryDto);
    // }
}