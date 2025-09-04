import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,   // stored as plain text (not secure in real apps)
  role: String
});

export default mongoose.model("User", userSchema);
