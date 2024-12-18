import axios from "axios";
import apiUrl from "../../service/api";

export const deleteNew = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/news/delete/${id}`);
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};
