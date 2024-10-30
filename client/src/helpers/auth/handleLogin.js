import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3500/users/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const decoded = jwtDecode(response.data.accessToken);
    const refresh = jwtDecode(response.data.refreshToken);
    console.log(decoded);
    console.log(refresh);
    return decoded.User;
  } catch (error) {
    console.error("Login error: ", error.response);
    return error.response;
  }
};
