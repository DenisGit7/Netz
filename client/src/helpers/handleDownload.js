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
    console.log("File downloaded: ", response.data.url);
    return response.data.url;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
