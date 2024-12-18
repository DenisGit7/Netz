import { User } from "../../../src/models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
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
    });
    res.status(201).json({ message: `User ${username} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Both fields are required" });
  }
  try {
    const user = await User.findOne({ username: username }).exec();
    if (!user) return res.status(401).json({ message: "User not found" });
    const checkPwd = await bcrypt.compare(password, user.password);
    if (checkPwd) {
      const accessToken = jwt.sign(
        {
          User: {
            username: user.username,
            role: user.role,
          },
        },
        "JSDHFJSHJFKHSJKGHSG",
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        "SJKDHJKFSHDJKFHJKSDHFJKHSKDJHKJFSD",
        { expiresIn: "1d" }
      );
      user.refreshToken = refreshToken;
      const result = await user.save();
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authStatus = () => {
  return;
};

export const logoutUser = () => {
  return;
};
