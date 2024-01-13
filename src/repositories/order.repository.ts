import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema, Types } from "mongoose";
import { DetailOrder } from "src/entities/detailorder.entity";
import { Order } from "src/entities/order.entity";

export class OrderRepository {
    constructor(
        @InjectModel(Order.name) 
        // @InjectModel(DetailOrder.name)
        private readonly orderModel: Model<Order>,
        // private readonly orderDetailModel: Model<DetailOrder>) 
        ){}

    async createOrder(body) {
        
        let order = new this.orderModel({
            userId: body.userId,
            productId: body.productId,
            status: body.status
        });

        
        order = await order.save();

        // let orderDetail = new this.orderDetailModel({
        //     orderId: order._id,
        //     quantity: body.quantity,
        //     price: body.price
        // })

        // orderDetail = await orderDetail.save();

        return order
            // orderDetail
        ;
    }

    async getOneById(id: Types.ObjectId) {
        const product = await this.orderModel.findOne(id)
        return product
    }
}