import mongoose, { Mongoose } from "mongoose";
import { Products, User } from "./model";
import { connectToDB } from "./utils";

const ITEM_PER_PAGE = 6;

export const fetchUser = async (q: string, page: number) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const count = await User.find({
      username: { $regex: regex },
    }).countDocuments();

    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { users, count };
  } catch (error) {
    throw new Error("Failed to fetch users!");
  }
};

export const fetchProducts = async (q: string, page: number) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const products = await Products.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    const count = await Products.find({
      title: { $regex: regex },
    }).countDocuments();
    return { products, count };
  } catch (err) {
    throw new Error("Failed to fetch products!");
  }
};

export async function findOne<T extends mongoose.Model<any>>(
  id: string,
  typeModel: T
) {
  try {
    connectToDB();
    const findOne = await typeModel.findById(id);
    return findOne;
  } catch (err) {
    console.log(err);
    throw new Error(`Can not fetch ${typeModel}!`);
  }
}

// export const fetchGeneric = async <T extends mongoose.Model<any>>(  query: string,
//   page: number,
//   typeModel: T,
// ) => {
//   const regex = new RegExp(query, "i");
//   try {
//     connectToDB();
//     const data = await typeModel
//       .find({ username: { $regex: regex } })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     const count = await typeModel
//       .find({ username: { $regex: regex } })
//       .countDocuments();
//     return { data, count };
//   } catch (err) {
//     throw new Error(`Failed to to fetch ${typeModel}`);
//   }
// };

// export const fetchUserOne = async (id: string) => {
//   try {
//     connectToDB();
//     const userFindOne = await User.findById(id);
//     return userFindOne;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Can't fetch user by id!");
//   }
// };

// TODO: to be revised with type "any"
