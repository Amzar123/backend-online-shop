import { InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema, Types } from "mongoose";
import { GetQueryDto } from "src/dto/getQueryDto";
import { Category } from "src/entities/category.entity";

export class CategoryRepository {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async createCategory(body) {
        
        let product = new this.categoryModel({
            name: body.name,
        });
        
        product = await product.save();

        return product;
    }

    async getOneById(id: string) {
        const product = await this.categoryModel.findById(id)
        return product
    }

    async getCategories(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let categories: Category[];

        try {
            if (limit === 0) {
                categories = await this.categoryModel
                    .find()
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                categories = await this.categoryModel
                    .find()
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            return categories;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}