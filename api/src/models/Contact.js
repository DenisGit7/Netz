import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  cellphone: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  fax: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

export const Contact = mongoose.model("Contact", userSchema);
// export default Post;
