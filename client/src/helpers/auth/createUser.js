import axios from "axios";
import { apiUrl } from "../../service/api";
export const createUser = async (newUser, newPwd, newRole) => {
  try {
    const response = await axios.post(`${apiUrl}/users/register`, {
      username: newUser,
      password: newPwd,
      role: newRole,
      firstName: firstName,
      lastName: lastName,
      buisnessId: buisnessId,
      sector: sector,
      email: email,
      phone: phone,
      desctription: desctription,
    });
    // console.log(response);
    return response;
  } catch (error) {
    // console.error("Register error: ", error);
    return error;
  }
};
