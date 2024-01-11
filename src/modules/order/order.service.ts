import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/repositories/order.repository";
import { CreateOrderDto } from "./dto/createOrder.dto";

@Injectable()
export class OrderService {
    constructor(private orderRepo: OrderRepository) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        return await this.orderRepo.createOrder(createOrderDto);
    }

    // async getCategory(getQueryDto: GetQueryDto) {
    //     return await this.categoryRepo.createCategory(getQueryDto);
    // }

    // async getCategoryById(id) {
    //     return await this.categoryRepo.getOneById(id);
    // }
}