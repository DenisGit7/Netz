import axios from "axios";
import classes from "./FileUpload.module.css";
import { Form, Link, redirect } from "react-router-dom";
import Modal from "../../components/Modal.js";
import { handleSubFolder } from "../../helpers/files/handleSubFolder.js";
import { useSession } from "../../context/SessionContext";

const FileUpload = () => {
  const { isLoggedIn, userInformation } = useSession();
  return (
    <Modal>
      <p>Choose a file from your computer, then click 'Upload'</p>
      <Form
        method="post"
        encType="multipart/form-data"
        className={classes.form}
      >
        <p>
          <label htmlFor="file">
            Choose file
            <input type="file" name="file" id="file" required />
          </label>
        </p>
        <input type="hidden" name="username" value={userInformation.username} />
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
  const subFolder = handleSubFolder();
  const fileData = Object.fromEntries(formData);
  const data = new FormData();
  data.append("file", fileData.file);
  data.append("customerFolder", fileData.username);
  data.append("subFolder", subFolder);
  try {
    const response = await axios.post(
      "http://localhost:3500/files/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error("Upload error: ", error);
    return error;
  }
  return redirect("/dashboard/files");
};
