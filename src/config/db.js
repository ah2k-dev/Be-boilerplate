const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

module.exports = connectDB;
