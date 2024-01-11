import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema, Types } from "mongoose";
import { Order } from "src/entities/order.entity";

export class OrderRepository {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

    async createOrder(body) {
        
        let order = new this.orderModel({
            userId: body.userId,
            productId: body.productId,
            status: body.status
        });
        
        order = await order.save();

        return order;
    }

    async getOneById(id: Types.ObjectId) {
        const product = await this.orderModel.findOne(id)
        return product
    }
}