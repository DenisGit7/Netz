import axios from "axios";
import { apiUrl } from "../../service/api";
export const handleDownload = async (file) => {
  const fileName = file.split("/").pop();

  const data = {
    filePath: file,
  };
  try {
    const response = await axios.post(`${apiUrl}/files/download`, data, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const fileUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
