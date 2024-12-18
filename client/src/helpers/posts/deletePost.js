import axios from "axios";
import { apiUrl } from "../../service/api";
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/posts/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
