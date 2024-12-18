import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  fullpath: {
    type: String,
  },

  uploaded: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  const count = await mongoose.model("LastUpload").countDocuments();
  if (count >= 20) {
    const oldest = await mongoose
      .model("LastUpload")
      .findOne()
      .sort({ uploaded: 1 });
    if (oldest) {
      await mongoose.model("LastUpload").findByIdAndDelete(oldest._id);
    }
  }
  next();
});

export const LastUpload = mongoose.model("LastUpload", userSchema);
// export default User;
