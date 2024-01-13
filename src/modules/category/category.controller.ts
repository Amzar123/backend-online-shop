import { Controller, Post, Body, Res, HttpStatus, BadRequestException, Get, Param } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Types } from "mongoose";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Response } from 'express';
import { Schema as MongooseSchema } from 'mongoose';
import { ResponseDto } from "src/dto/response.dto";

@Controller('categories')
export class CategoryController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private categoryService: CategoryService) {}

    @Post('/one')
    async createProduct(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
        try {
            const category: any = await this.categoryService.createCategory(createCategoryDto);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: category,
                message: "success create users"
              });
        
            return res.status(200).json(responseObject);   
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

    @Get('/:id')
    async getProductById(@Param('id') id: Types.ObjectId, @Res() res: Response) {
        const category: any = await this.categoryService.getCategoryById(id);
        const responseObject: ResponseDto = new ResponseDto({
            code: HttpStatus.OK,
            data: category,
            message: "success get category"
          });
    
        return res.status(200).json(responseObject);  
    }

    // @Get()
    // async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    //     const storages: any = await this.productService.getProducts(getQueryDto);
    //     return res.status(HttpStatus.OK).send(storages);
    // }
}