import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { CreateProductDto } from "src/modules/product/dto/createProduct.dto";

export class CategoryRepository {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async createCategory(body) {
        
        let product = new this.categoryModel({
            name: body.name,
        });
        
        product = await product.save();

        return product;
    }

    // async getProducts(query: GetQueryDto) {
    //     let from = query.from || 0;
    //     from = Number(from);

    //     let limit = query.limit || 0;
    //     limit = Number(limit);

    //     let products: Product[];

    //     try {
    //         if (limit === 0) {
    //             products = await this.productModel
    //                 .find()
    //                 .skip(from)
    //                 .sort({ createdAt: -1 })
    //                 .exec();
    //         } else {
    //             products = await this.productModel
    //                 .find()
    //                 .skip(from)
    //                 .limit(limit)
    //                 .sort({ createdAt: -1 })
    //                 .exec();
    //         }

    //         let response;

    //         if (products.length > 0) {
    //             response = {
    //                 ok: true,
    //                 data: products,
    //                 message: 'Get Products Ok!',
    //             };
    //         } else {
    //             response = {
    //                 ok: true,
    //                 data: [],
    //                 message: 'No hay products',
    //             };
    //         }
    //         return response;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }
}