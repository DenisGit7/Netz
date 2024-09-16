import React from "react";
import axios from "axios";

const Remove = (props) => {
  console.log(props.file);
  const handleRemove = async (e) => {
    e.preventDefault();
    const data = {
      fileName: "",
      customerFolder: "Test",
      subFolder: "",
    };
    try {
      const response = await axios.post(
        "http://localhost:3500/files/remove",
        data
      );
      console.log("File removed: ", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      Remove
      <button type="submit" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default Remove;
