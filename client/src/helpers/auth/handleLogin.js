import axios from "axios";
import { jwtDecode } from "jwt-decode";
import apiUrl from "../../service/api";

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/login`,
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

    return decoded.User;
  } catch (error) {
    console.error("Login error: ", error.response);
    return error.response;
  }
};
