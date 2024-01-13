import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    imageUrl: string;

    @IsOptional()
    @ApiProperty()
    categoryId: string;
}