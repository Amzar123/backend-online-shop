import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class DetailOrder extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    orderId: MongooseSchema.Types.ObjectId;

    @Prop({ type: Number })
    quantity: number;

    @Prop({ type: Number })
    price: number;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const DetailOrderSchema = SchemaFactory.createForClass(DetailOrder);