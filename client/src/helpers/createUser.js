import axios from "axios";

export const createUser = async () => {
  try {
    const response = await axios.post("http://localhost:3500/users/register", {
      username: "Admin1",
      password: "Admin",
      role: "Admin",
    });
    console.log(response);
  } catch (error) {
    console.error("Login error: ", error);
  }
};
