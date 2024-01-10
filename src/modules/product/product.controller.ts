import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { CategoryService } from '../category/category.service';

@Controller('products')
export class ProductController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private productService: ProductService) {}

    @Post('/one')
    async createProduct(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
        try {
            const newProduct: any = await this.productService.createProduct(createProductDto);
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Put('/update/:id')
    async updateProduct(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.productService.updateProduct(updateProductDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/:id')
    async getProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.productService.getProductById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Get()
    async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.productService.getProducts(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}