import axios from "axios";

export const deletePost = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete("http://localhost:3500/posts/delete", {
      data: {
        id: id,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    // console.error(" error: ", error);
    return error;
  }
};
