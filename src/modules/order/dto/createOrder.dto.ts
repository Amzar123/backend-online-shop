export class CreateOrderDto {
    userId: string;
    productId: string;
    status: string;
    quantity: number;
    price: number;
}