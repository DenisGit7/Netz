import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3500/posts/get");
    const result = response.data.posts;

    return result;
  } catch (error) {
    return error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3500/posts/get/${id}`,
      {}
    );
    const result = response.data.post;

    return result;
  } catch (error) {
    return error;
  }
};
