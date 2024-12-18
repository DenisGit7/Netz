import { User } from "../../src/models/Users.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

export const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

export const editUser = async (req, res) => {
  const id = req?.params?.id;
  const toUpdate = req?.body;
  const user = await User.findById({ _id: id }).exec();
  try {
    const hashedPassword =
      toUpdate.password != ""
        ? await bcrypt.hash(toUpdate.password, 10)
        : user.password;

    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
      buisnessId: toUpdate.buisnessId,
      firstName: toUpdate.firstName,
      lastName: toUpdate.lastName,
      email: toUpdate.email,
      sector: toUpdate.sector,
      phone: toUpdate.phone,
      description: toUpdate.description,
    });

    res.status(201).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeUser = async (req, res) => {
  const id = req?.params?.id;
  if (!id) return res.status(400).json({ message: "User ID required" });

  const user = await User.findOne({ _id: id }).exec();

  if (!user) {
    return res.status(400).json({ message: `User ID ${id} not found` });
  }
  const result = await user.deleteOne({ _id: id });

  res.json(result);
};
