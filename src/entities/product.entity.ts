import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ type: String })
    name: string;

    @Prop({ type:  Number})
    price: number;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    imageUrl: string;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    categoryId: MongooseSchema.Types.ObjectId;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);