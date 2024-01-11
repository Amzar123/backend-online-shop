import { Controller, Post, Body, Res, BadRequestException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { Response } from 'express';
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/createOrder.dto";

@Controller('orders')
export class OrderController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private orderService: OrderService) {}

    @Post('/one')
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
        try {
            const order: any = await this.orderService.createOrder(createOrderDto);
            return res.status(200).send(order)
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}