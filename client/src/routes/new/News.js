import { Link, Outlet } from "react-router-dom";
import NewsList from "../../features/new/NewsList";
import classes from "./News.module.css";
import { getNews } from "../../helpers/news/getNews";
import { FaEnvelope } from "react-icons/fa6";
import { useSession } from "../../context/SessionContext";

const News = () => {
  const { isLoggedIn, userInformation } = useSession();

  return (
    <>
      <Outlet />
      <div className={classes.newsContainer}>
        {/* <main className={classes.newsContainer}> */}
        {userInformation?.role?.includes("Admin") && (
          <Link to="/dashboard/create-new" className={classes.create}>
            <FaEnvelope />
            <p className={classes.label}>Create Notification</p>
          </Link>
        )}
        <NewsList />
      </div>
      {/* </main> */}
    </>
  );
};

export default News;

export const loader = async () => {
  const response = await getNews();
  return response;
};
