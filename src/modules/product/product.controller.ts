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
import { ResponseDto } from 'src/dto/response.dto';

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
                const responseObject: ResponseDto = new ResponseDto({
                    code: HttpStatus.NOT_FOUND,
                    message: "category not found",
                    error: "CATEGORY_NOT_FOUND"
                  });
            
                return res.status(200).json(responseObject);  
            }

            const newProduct: any = await this.productService.createProduct(createProductDto);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: newProduct,
                message: "success create product"
              });
        
            return res.status(200).json(responseObject);  
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Patch('/:id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
        try {
            const newProduct: any = await this.productService.updateProduct(id, updateProductDto);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: newProduct,
                message: "success update product"
              });
        
            return res.status(200).json(responseObject);  
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('/:id')
    async getProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const product: any = await this.productService.getProductById(id);
        const responseObject: ResponseDto = new ResponseDto({
            code: HttpStatus.OK,
            data: product,
            message: "success get product"
          });
    
        return res.status(200).json(responseObject);  
    }

    @Get()
    async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const products: any = await this.productService.getProducts(getQueryDto);
        const responseObject: ResponseDto = new ResponseDto({
            code: HttpStatus.OK,
            data: products,
            message: "success get product",
            total: products.length
          });
    
        return res.status(200).json(responseObject);  
    }

    @Delete('/:id')
    async deleteProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        console.log("masuk sini gasih")
        const product: any = await this.productService.deleteProductId(id);
        const responseObject: ResponseDto = new ResponseDto({
            code: HttpStatus.OK,
            data: product,
            message: "success delete product",
          });
    
        return res.status(200).json(responseObject);  
    }
}