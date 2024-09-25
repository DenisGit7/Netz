import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const handleLogin = async (user, pwd) => {
  try {
    const response = await axios.post("http://localhost:3500/users/login", {
      username: user,
      password: pwd,
    });
    const decoded = jwtDecode(response.data.accessToken);
    return decoded.User;
  } catch (error) {
    // console.error("Login error: ", error.response);
    return error.response;
  }
};
