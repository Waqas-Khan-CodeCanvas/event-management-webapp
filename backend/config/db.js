const mongoose = require("mongoose");
const { mongoUri } = require("./env");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.warn("⚠️ MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      autoIndex: false, // don't build indexes in production
      maxPoolSize: 10, // maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // keep trying to send operations for 5s
      socketTimeoutMS: 45000, // close sockets after 45s of inactivity
    });

    isConnected = true;
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed : `, error.message);
    process.exit(1); // exit process with failure
  }
};

/*
    @ Gracefull shutdown 
    @ Ensure DB connection closes properly when app terminates
*/
// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(` MongoDB connection closed (${signal})`);
    process.exit(0);
  } catch (err) {
    console.error(" Error during MongoDB shutdown:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown); // nodemon

module.exports = connectDB;