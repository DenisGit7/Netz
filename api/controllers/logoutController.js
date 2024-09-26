import { User } from "../models/Users.js";

export const logoutUser = async (req, res) => {
  const cookies = req;
  console.log(cookies + "***************");
  // console.log(res.headers);
  if (!cookies?.jwt) return res.status(204).json({ message: "No cookies" });

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });

    return res.status(204).json({ message: "No cookies" });
  }
  user.refreshToken = "";

  const result = await user.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });

  res.status(204).json({ message: "Cookies cleared" });
};
