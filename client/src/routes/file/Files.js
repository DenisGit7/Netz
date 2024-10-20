import axios from "axios";
import classes from "./Files.module.css";
import FileList from "../../features/file/FileList";
import BackArrow from "../../components/BackArrow";

const Files = (
  {
    // files,
    // setFiles,
    // folders,
    // setFolders,
    // folderPath,
    // setFolderPath,
    // role
  }
) => {
  const folderpath = null;
  return (
    <div className={classes.container}>
      <p className={classes.text}>Your files get organised here by Month</p>
      <div className={classes.navigation}>
        {/* <p className={classes.navText}>
          Current Folder :
          {folderPath.customerFolder ? (
            <span className={classes.span}> {folderPath.customerFolder}</span>
          ) : (
            ' Root'
          )}
          {folderPath.subFolder && (
            <span className={classes.span}> / {folderPath.subFolder}</span>
          )}
        </p>
        {folderPath.subFolder && (
          <BackArrow folderPath={folderPath} setFolderPath={setFolderPath} />
        )} */}
      </div>

      <FileList
      // role={role}
      // files={files}
      // setFiles={setFiles}
      // folders={folders}
      // setFolders={setFolders}
      // folderPath={folderPath}
      // setFolderPath={setFolderPath}
      />
    </div>
  );
};

export default Files;

export const loader = async () => {
  const data = {
    customerFolder: "customerFolder",
    subFolder: "subFolder",
  };

  try {
    const response = await axios.post(
      "http://localhost:3500/files/getlist",
      data
    );
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
