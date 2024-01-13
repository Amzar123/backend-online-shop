import { Controller, Post, Body, Res, HttpStatus, BadRequestException, Get, Param, Query } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Types } from "mongoose";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Response } from 'express';
import { ResponseDto } from "src/dto/response.dto";
import { GetQueryDto } from "src/dto/getQueryDto";

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

    @Get('/:id')
    async getCategoryById(@Param('id') id: string, @Res() res: Response) {
        const category: any = await this.categoryService.getCategoryById(id);
        const responseObject: ResponseDto = new ResponseDto({
            code: HttpStatus.OK,
            data: category,
            message: "success get category"
          });
    
        return res.status(200).json(responseObject);  
    }

    @Get()
    async getProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const categories: any = await this.categoryService.getCategories(getQueryDto);
        const responseObject: ResponseDto = new ResponseDto({
            code: HttpStatus.OK,
            data: categories,
            message: "success get categories",
            total: categories.length
          });
    
        return res.status(200).json(responseObject);  
    }
}