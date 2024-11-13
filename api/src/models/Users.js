import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  role: { type: String, default: "Customer", required: true },
  firstName: { type: String },
  lastName: { type: String },
  buisnessId: { type: String },
  sector: { type: String },
  email: { type: String },
  phone: { type: String },
  description: { type: String },
  refreshToken: String,
});

export const User = mongoose.model("User", userSchema);
// export default User;
