import mongoose from "mongoose";
import "dotenv/config";

// Create a connection to database
export const connectToDB = async () => {
  const connection: any = {};
  try {
    const db = await mongoose.connect(`${process.env.MONGO}`);
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.name); // the type of error
      console.log(err.message); // the description of the error
      console.log(err.stack); // the stack trace of the error
    }
  }
};
