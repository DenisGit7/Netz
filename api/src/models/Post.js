import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  updated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});
userSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated: Date.now() });
  next();
});

userSchema.pre("updateOne", function (next) {
  this.set({ updated: Date.now() });
  next();
});
export const Post = mongoose.model("Post", userSchema);
// export default Post;
