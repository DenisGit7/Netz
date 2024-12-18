import axios from "axios";

export const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("response");

    console.error("Login error: ", error);

    return error;
  }
};
