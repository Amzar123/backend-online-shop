import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { CategoryService } from '../category/category.service';
import { Types } from 'mongoose';

@Controller('products')
export class ProductController {
    constructor(
        @InjectConnection() 
        private readonly mongoConnection: Connection,
        private productService: ProductService,
        private categoryService: CategoryService
        ) {}

    @Post('/one')
    async createProduct(@Body() createProductDto: CreateProductDto, @Res() res: Response) {

        try {
            const objectID = new Types.ObjectId(createProductDto.categoryId);
            // check if category is exist
            const category = await this.categoryService.getCategoryById(objectID);
            if (!category) {
                return res.status(404).send({
                    code: 404,
                    info: 'Category not found',
                    messageId: 'CATEGORY_NOT_FOUND'
                });
            }

            const newProduct: any = await this.productService.createProduct(createProductDto);
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Patch('/:id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
        try {
            const newProduct: any = await this.productService.updateProduct(id, updateProductDto);
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            throw new BadRequestException(error);
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

    @Delete('/:id')
    async deleteProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        console.log("masuk sini gasih")
        const storage: any = await this.productService.deleteProductId(id);
        return res.status(HttpStatus.OK).send(storage);
    }
}