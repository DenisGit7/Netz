import axios from "axios";

export const getNews = async () => {
  const response = await axios.get("http://localhost:3500/news/get");
  try {
    const result = response.data.news;

    return result;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const getNew = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3500/news/get/${id}`,
      {}
    );
    const result = response.data.news;

    return result;
  } catch (error) {
    return error;
  }
};
