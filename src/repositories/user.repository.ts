import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';

export class UserRepository {
    constructor(@InjectModel(Product.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        
        let user = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            address: createUserDto.address,
            phone: createUserDto.phone
        });
        
        user = await user.save();

        return user;
    }

    // async updateProduct(updateProduct: UpdateProductDto, session: ClientSession) {
    //     const actualDate = new Date();
    //     actualDate.toUTCString();

    //     const updateData = {
    //         updatedAt: actualDate,
    //     };

    //     let product;
    //     try {
    //         // product = await this.productModel
    //         //     .findOneAndUpdate({ _id: updateProduct.id }, updateData, {
    //         //         new: true,
    //         //     })
    //         //     .session(session)
    //         //     .exec();
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }

    //     if (!product) {
    //         throw new ConflictException('Error trying to update product');
    //     }

    //     return product;
    // }

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

    // async getProductById(id: MongooseSchema.Types.ObjectId) {
    //     let product;
    //     try {
    //         product = await this.productModel.findById(id).exec();
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }

    //     if (!product) {
    //         throw new NotFoundException('The product with this id does not exist');
    //     }

    //     return product;
    // }
}