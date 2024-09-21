import { FaArrowLeft } from "react-icons/fa6";
import classes from "./BackArrow.module.css";

const BackArrow = ({ folderPath, setFolderPath }) => {
  const handleChangeBack = (e) => {
    e.preventDefault();
    setFolderPath({
      customerFolder: folderPath.customerFolder || "General",
      subFolder: "",
    });
  };

  return (
    <div className={classes.container}>
      <FaArrowLeft
        className={classes.arrow}
        onClick={(e) => handleChangeBack(e)}
      />
      <p className={classes.navText}>Go back</p>
    </div>
  );
};

export default BackArrow;
