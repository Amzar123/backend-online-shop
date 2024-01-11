import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    productId: MongooseSchema.Types.ObjectId;

    @Prop({ type: Date, default: Date.now })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);