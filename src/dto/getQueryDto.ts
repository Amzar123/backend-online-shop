import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class GetQueryDto {
    @IsOptional()
    @ApiProperty()
    id: MongooseSchema.Types.ObjectId;

    @IsOptional()
    @ApiProperty()
    from?: number;

    @IsOptional()
    @ApiProperty()
    limit?: number;
}