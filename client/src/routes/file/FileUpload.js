import axios from "axios";
import toast from "react-hot-toast";
import classes from "./FileUpload.module.css";
import { getList } from "../../helpers/files/getList.js";
import { Form, Link, redirect, Outlet } from "react-router-dom";
import Modal from "../../components/Modal.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("customerFolder", uploadPath.customerFolder);
    // formData.append("subFolder", uploadPath.subFolder);
    formData.append("customerFolder", "Admin");
    formData.append("subFolder", "Month");
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

      console.log(response);
      toast.success("File uploaded successfuly");

      setTimeout(() => {
        navigate("/files");
      }, 1000);
    } catch (error) {
      toast.error(error);
    }
    // setLoading(false);
    // setTimeout(() => {
    //   getList(
    //     setFiles,
    //     setFolders,
    //     folderPath.customerFolder,
    //     folderPath.subFolder
    //   );
    // }, 1000);
    // setFile([]);
  };

  return (
    <Modal>
      <p>Choose a file from your computer, then click 'Upload'</p>
      <Form method="post" className={classes.form} onSubmit={handleSubmit}>
        <p>
          <label htmlFor="file">
            Choose file
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                handleFileInput(e);
              }}
              required
            />
          </label>
        </p>
        <p>
          <h4 className={classes.label}>
            {/* {!file.name ? "Waiting for file" : file.name} */}
          </h4>
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Upload</button>
        </p>
      </Form>
    </Modal>
  );
};

export default FileUpload;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const fileData = Object.fromEntries(formData);
  try {
    await axios.post("http://localhost:3500/files/upload", {
      file: fileData.file,
    });
  } catch (error) {
    // console.error("Register error: ", error);
    return error;
  }

  return redirect("/files");
};
