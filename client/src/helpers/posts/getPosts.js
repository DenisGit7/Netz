import axios from "axios";
import apiUrl from "../../service/api";

export const getPosts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/posts/get`);
    const result = response.data.posts;

    return result;
  } catch (error) {
    return error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/posts/get/${id}`, {});
    const result = response.data.post;

    return result;
  } catch (error) {
    return error;
  }
};
