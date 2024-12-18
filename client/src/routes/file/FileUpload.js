import axios from "axios";
import { useEffect, useState } from "react";

import classes from "./FileUpload.module.css";
import apiUrl from "../../service/api";

import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Modal from "../../components/Modal.js";
import { handleSubFolder } from "../../helpers/files/handleSubFolder.js";
import { useSession } from "../../context/SessionContext";
import toast from "react-hot-toast";

const FileUpload = () => {
  const { isLoggedIn, userInformation } = useSession();
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  const response = useActionData();
  const navigate = useNavigate();

  if (res?.status) {
    setLoading(false);
    toast.dismiss();

    if (res.status === 200) {
      toast.success("File uploaded", { duration: 2000 });
      setRes("");
      navigate("/dashboard/files");
    }
    if (res?.status === 409) {
      toast.error("Uploading error", { duration: 2000 });
      setRes("");
    }
  }
  useEffect(() => {
    if (!response) {
      setRes(response);
    }
  }, [response]);
  if (loading) {
    toast.loading("Uploading...", { duration: 3000 });

    setLoading(false);
  }

  return (
    <Modal>
      <Form
        method="post"
        encType="multipart/form-data"
        className={classes.form}
        onSubmit={() => setLoading(true)}
      >
        <p>
          <label htmlFor="file">
            Choose a file from your computer, then click 'Upload'
            <input type="file" name="file" id="file" required />
          </label>
        </p>
        <input type="hidden" name="username" value={userInformation.username} />
        <p className={classes.actions}>
          <Link to=".." type="button">
            <button>Cancel</button>
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
    const response = await axios.post(`${apiUrl}/files/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    sessionStorage.setItem("customerFolder", fileData.username);
    sessionStorage.setItem("subFolder", subFolder);
    return response;
  } catch (error) {
    console.error("Upload error: ", error);
    return error;
  }

  return redirect("/dashboard/files");
};
