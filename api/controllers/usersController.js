import { User } from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

export const removeUser = async (req, res) => {
  console.dir(req.body);
  const { id } = req.body;
  console.log("1", id);
  if (!id) return res.status(400).json({ message: "User ID required" });

  const user = await User.findOne({ _id: id }).exec();
  console.log("2");

  if (!user) {
    console.log("3");

    return res.status(400).json({ message: `User ID ${id} not found` });
  }
  const result = await user.deleteOne({ _id: id });
  console.log("4");

  res.json(result);
};

export const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};
