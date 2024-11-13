const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017/bank-app";

// Connect to MongoDB
const connectDB = async (serverListener) => {
  try {
    const connect = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected to database: ${connect.connection.name}`);
    // start the server if the connection is successful
    serverListener();
  } catch (error) {
    console.error("Error connecting to MongoDB)", error);
  }
};

module.exports = { connectDB };
