import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Database ");
    });
    mongoose.connection.on("error", (error) => {
      console.log("error to MongoDB Database", error);
      process.exit(1);
    });
    await mongoose.connect(config.mongoUrl as string);
    // await mongoose.connect(`${config.mongoUrl}/${config.name}`);
  } catch (error) {
    console.error("Failed to connect MongoDB ", error);
  }
};

export default connectDB;
