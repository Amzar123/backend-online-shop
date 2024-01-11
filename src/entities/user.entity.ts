import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String })
    address: string;

    @Prop({ type: String })
    phone: string;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);