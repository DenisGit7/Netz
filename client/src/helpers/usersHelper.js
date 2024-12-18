import axios from "axios";
import { apiUrl } from "../service/api";
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/customers`);
    return response.data;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/customers/${id}`, {});
    return response.data;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const removeUser = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/customers/${id}`);
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error.response;
  }
};
