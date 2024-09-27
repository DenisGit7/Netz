import axios from "axios";

export const getPosts = async () => {
  const response = await axios.get("http://localhost:3500/posts/get");
  try {
    const result = await response.data.posts;
    return result;
    // console.log(result);
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};
