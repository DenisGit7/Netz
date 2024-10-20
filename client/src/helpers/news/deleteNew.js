import axios from "axios";

export const deleteNew = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3500/news/delete/${id}`
    );
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};
