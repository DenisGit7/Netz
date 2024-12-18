import { Link, Outlet } from "react-router-dom";
import NewsList from "../../features/new/NewsList";
import classes from "./News.module.css";
import { getNews } from "../../helpers/news/getNews";
import { FaEnvelope } from "react-icons/fa6";
import { useSession } from "../../context/SessionContext";
import { useState } from "react";

const News = () => {
  const { isLoggedIn, userInformation } = useSession();
  const [userClass, setUserClass] = useState(() => {
    if (userInformation?.role.includes("Admin")) {
      return `${classes.newsContainer} ${classes.newsContainerAdmin}`;
    } else {
      return `${classes.newsContainer}`;
    }
  });
  return (
    <>
      <Outlet />
      <div className={userClass}>
        {userInformation?.role?.includes("Admin") && (
          <Link to="/dashboard/create-new" className={classes.create}>
            <FaEnvelope />
            <p className={classes.label}>Create Notification</p>
          </Link>
        )}
        <NewsList />
      </div>
    </>
  );
};

export default News;

export const loader = async () => {
  const response = await getNews();
  return response;
};
