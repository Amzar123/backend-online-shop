import { Controller, Post, Body, Res, HttpStatus, BadRequestException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/createProduct.dto";
import { Response } from 'express';

@Controller('categories')
export class CategoryController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private categoryService: CategoryService) {}

    @Post('/one')
    async createProduct(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
        try {
            const category: any = await this.categoryService.createCategory(createCategoryDto);
            return res.status(200).send(category)
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // @Put('/update/:id')
    // async updateProduct(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    //     const session = await this.mongoConnection.startSession();
    //     session.startTransaction();
    //     try {
    //         const newProduct: any = await this.productService.updateProduct(updateProductDto, session);
    //         await session.commitTransaction();
    //         return res.status(HttpStatus.OK).send(newProduct);
    //     } catch (error) {
    //         await session.abortTransaction();
    //         throw new BadRequestException(error);
    //     } finally {
    //         session.endSession();
    //     }
    // }

    // @Get('/:id')
    // async getProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
    //     const storage: any = await this.productService.getProductById(id);
    //     return res.status(HttpStatus.OK).send(storage);
    // }

    // @Get()
    // async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    //     const storages: any = await this.productService.getProducts(getQueryDto);
    //     return res.status(HttpStatus.OK).send(storages);
    // }
}