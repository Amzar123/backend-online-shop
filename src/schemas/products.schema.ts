import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    categoryId: String,
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  },
);

export interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
