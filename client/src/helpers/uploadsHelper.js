import axios from "axios";
import apiUrl from "../service/api";

export const getUploads = async () => {
  try {
    const response = await axios.get(`${apiUrl}/uploads/get`);

    return response.data.uploads;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};

export const deleteUpload = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/uploads/delete/${id}`);
    return response;
  } catch (error) {
    console.error(" error: ", error);
    return error;
  }
};
