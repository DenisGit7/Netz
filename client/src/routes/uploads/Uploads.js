import { Link, Outlet } from "react-router-dom";
import UploadList from "../../features/uploads/UploadList";
import classes from "./Uploads.module.css";
import { getUploads } from "../../helpers/uploadsHelper";
import { useSession } from "../../context/SessionContext";

const Uploads = () => {
  const { isLoggedIn, userInformation } = useSession();

  return (
    <>
      <Outlet />
      <div className={classes.postsContainer}>
        {userInformation?.role?.includes("Admin") && (
          <Link className={classes.create}>
            <p className={classes.label}></p>
          </Link>
        )}
        <UploadList />
      </div>
    </>
  );
};

export default Uploads;

export const loader = async () => {
  const response = await getUploads();
  return response;
};

//instead of having getPosts() here, we can have the get request directly here, but this is not required, since loader works every time
