import mongoose from "mongoose";

export type TypeUser = {
  username: String;
  email: String;
  password: String;
  phone?: String;
  img?: String;
  isAdmin: boolean;
  isActive: boolean;
  address?: String;
};

export type TypeProducts = {
  title: String;
  price: Number;
  size: String;
  img?: String;
  desc: String;
  stock: Number;
  color?: String;
  category: String;
  createdAt?: String;
};

const usersSchema = new mongoose.Schema<TypeUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    address: { type: String },
  },
  { timestamps: true }
);

const productsSchema = new mongoose.Schema<TypeProducts>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
    img: { type: String },
    desc: { type: String, required: true },
    color: { type: String },
    category: { type: String, required: true },
    createdAt: { type: String },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<TypeUser>("User", usersSchema);
export const Products =
  mongoose.models.Products ||
  mongoose.model<TypeProducts>("Products", productsSchema);
