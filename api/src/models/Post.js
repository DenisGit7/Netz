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
  date: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Post", userSchema);
// export default Post;
