import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "src/entities/order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "src/repositories/order.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderService, OrderRepository],
})
export class CategoryModule {}