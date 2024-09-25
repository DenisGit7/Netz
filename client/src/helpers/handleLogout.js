import axios from "axios";

export const handleLogout = async () => {
  try {
    const response = await axios.post("http://localhost:3500/users/logout");
    console.log(response);
  } catch (error) {
    console.error("Login error: ", error);
  }
};
