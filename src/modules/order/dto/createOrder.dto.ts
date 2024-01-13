import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    productId: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
}