import mongoose from "mongoose";

// Connect to the MongoDB database
const mongoDBURI = process.env.MONGODB_URI;

try {
  mongoose.connect(mongoDBURI);
  console.log("MongoDB Connected!");
} catch (err) {
  console.log("Error in connecting to MongoDB", err);
}
mongoose.connect(mongoDBURI);

export default mongoose;
