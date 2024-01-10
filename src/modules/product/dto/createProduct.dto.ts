import { IsOptional } from 'class-validator';

export class CreateProductDto {
    name: string;
    price: number;
    description: string;
    imageUrl: string;

    @IsOptional()
    categoryId: string;
}