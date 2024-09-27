import axios from "axios";

export const handleDownload = async (customerFolder, subFolder, fileName) => {
  const data = {
    filePath: `${customerFolder}/${subFolder}/${fileName}`,
  };
  try {
    const response = await axios.post(
      "http://localhost:3500/files/download",
      data
    );
    const fileUrl = response.data.url;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return fileUrl;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
