import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./src/config/config.env",
});

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected: " + connection.host);
  } catch (error) {
    console.log("Error connecting database: " + error);
    process.exit(1);
  }
};

export default connectDB;
