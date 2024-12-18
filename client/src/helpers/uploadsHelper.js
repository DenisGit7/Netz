import axios from "axios";

export const getUploads = async () => {
  try {
    const response = await axios.get("http://localhost:3500/uploads/get");

    return response.data.uploads;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const deleteUpload = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3500/uploads/delete/${id}`
    );
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};
