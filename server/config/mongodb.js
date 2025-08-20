import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
}

export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Listen for successful connection
//     mongoose.connection.on("connected", () => {
//       console.log("✅ Database Connected");
//     });

//     // Listen for errors
//     mongoose.connection.on("error", (err) => {
//       console.error("❌ Database connection error:", err);
//     });

//   } catch (error) {
//     console.error("❌ Database Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
