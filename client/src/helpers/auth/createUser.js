import axios from "axios";

export const createUser = async (newUser, newPwd, newRole) => {
  try {
    const response = await axios.post("http://localhost:3500/users/register", {
      username: newUser,
      password: newPwd,
      role: newRole,
    });
    // console.log(response);
    return response;
  } catch (error) {
    // console.error("Register error: ", error);
    return error;
  }
};
