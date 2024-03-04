"use server";
import { Products, User } from "./model";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { signIn } from "../../auth";

export const addUser = async (formData: FormData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  // bcrypt function to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password.toString(), salt);

  try {
    connectToDB();
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create new user");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData: FormData) => {
  const { title, price, size, stock, img, desc, color, category, createdAt } =
    Object.fromEntries(formData);
  try {
    connectToDB();
    const newProduct = new Products({
      title,
      price,
      size,
      stock,
      img,
      desc,
      color,
      category,
      createdAt,
    });
    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create new product!");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Products.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
  revalidatePath("/dashboard/products");
};

export const deleteUser = async (id: string) => {
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Can not delete User!");
  }
};

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    connectToDB();
    const updatedField = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updatedField).forEach(
      (key) =>
        (updatedField[key as keyof typeof updatedField] === "" || undefined) &&
        delete updatedField[key as keyof typeof updatedField]
    );
    await User.findByIdAndUpdate(id, updatedField);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const authentication = async (formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err: any) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
