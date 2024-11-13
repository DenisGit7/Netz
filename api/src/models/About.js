import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  content1: {
    type: String,
  },
  content2: {
    type: String,
  },

  date: { type: Date, default: Date.now },
});

export const About = mongoose.model("About", userSchema);
// export default Post;
