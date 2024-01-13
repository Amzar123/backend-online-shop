import { Controller, Post, Body, Res, BadRequestException, HttpStatus } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { Response } from 'express';
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { ResponseDto } from "src/dto/response.dto";

@Controller('orders')
export class OrderController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private orderService: OrderService) {}

    @Post('/one')
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
        try {
            const order: any = await this.orderService.createOrder(createOrderDto);
            const responseObject: ResponseDto = new ResponseDto({
                code: HttpStatus.OK,
                data: order,
                message: "success create order"
              });
        
            return res.status(200).json(responseObject);  
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}