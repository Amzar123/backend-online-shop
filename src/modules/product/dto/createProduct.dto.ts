import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateProductDto {
    name: string;
    price: number;
    description: string;
    imageUrl: string;

    @IsOptional()
    categoryId: string;
}