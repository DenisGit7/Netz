import { Link } from "react-router-dom";
import classes from "./Upload.module.css";
import { TbXboxXFilled } from "react-icons/tb";
import { deleteUpload } from "../../helpers/uploadsHelper";
import { useNavigate } from "react-router-dom";
import { handleDownload } from "../../helpers/files/handleDownload";
import toast from "react-hot-toast";

const Upload = ({ username, fullpath, createdAt, id }) => {
  const fileName = fullpath.split("/").pop();
  const uploadDate = createdAt.split("T")[0];
  const uploadedTime = createdAt.split("T")[1].split("Z")[0].split(".")[0];
  const timeout = 200;
  const navigate = useNavigate();
  const handleRemove = async (id) => {
    toast.loading("Waiting...", { duration: 3000 });

    await deleteUpload(id);
    setTimeout(() => {
      toast.dismiss();
      toast.success("Upload note deleted successfully", { duration: 3000 });
      navigate("/dashboard");
    }, 200);
  };
  return (
    <li className={classes.post}>
      <p className={classes.title}>{username}</p>
      <Link onClick={(e) => handleDownload(fullpath)}>
        <div className={classes.content}>
          <p className={classes.fileName}>{fileName}</p>
          <p>{uploadDate}</p>
          <p>{uploadedTime}</p>
        </div>
      </Link>
      <div className={classes.remove}>
        {" "}
        <Link onClick={() => handleRemove(id)} className={classes.create}>
          <TbXboxXFilled />
          <p className={classes.label}>Remove</p>
        </Link>
      </div>
    </li>
  );
};

export default Upload;
