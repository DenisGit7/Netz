import axios from "axios";
import React, { useEffect, useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(undefined);
  const [filePath, setFilePath] = useState("");
  const [customerFolder, setcustomerFolder] = useState("General");
  const [subCustomerFolder, setsubCustomerFolder] = useState("subFolder");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("customerFolder", customerFolder);
    formData.append("subFolder", subCustomerFolder);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3500/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="upload">
      Upload
      <form onSubmit={handleSubmit}>
        <div>
          <br />
          <input
            type="file"
            id="file"
            onChange={(e) => setFile((prev) => e.target.files[0])}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
