import axios from "axios";
import { apiUrl } from "../../service/api";
export const createNew = async (title, content) => {
  try {
    const response = await axios.post(`${apiUrl}/news/create`, {
      title: title,
      content: content,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};
