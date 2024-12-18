import { User } from "../../../src/models/Users.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const {
    username,
    password,
    role,
    firstName,
    lastName,
    buisnessId,
    sector,
    email,
    phone,
    description,
  } = req.body;
  if (!username || !password || !role)
    return res.status(400).json({ message: "All fields are required." });
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.status(409).json({ message: "User already exist" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username: username,
      password: hashedPassword,
      role: role,
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      buisnessId: buisnessId ? buisnessId : "",
      sector: sector ? sector : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      description: description ? description : "",
    });
    res.status(201).json({ message: `User ${username} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
