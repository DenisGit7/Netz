import Posts from "../routes/post/Posts";
import News from "../routes/new/News";
import Uploads from "../routes/uploads/Uploads";
import classes from "../pages/HomePage.module.css";
import { Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const HomePage = () => {
  const { isLoggedIn, userInformation } = useSession();

  return (
    <div className={classes.container}>
      <Outlet />
      <Posts />
      <News />
      {userInformation?.role?.includes("Admin") && <Uploads />}
    </div>
  );
};

export default HomePage;
