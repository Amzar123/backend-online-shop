import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DetailOrder } from './detailorder.entity';
// import {
//     OneToOne,
//     JoinColumn,
// } from "typeorm"

@Schema()
export class Order extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    productId: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    status: string;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    // @OneToOne(() => DetailOrder)
    // @JoinColumn()
    // detailOrder: DetailOrder
}

export const OrderSchema = SchemaFactory.createForClass(Order);