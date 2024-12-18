import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3500/customers");
    return response.data;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3500/customers/${id}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const removeUser = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3500/customers/${id}`
    );
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error.response;
  }
};
