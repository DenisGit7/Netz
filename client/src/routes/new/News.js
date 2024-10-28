import { Link, Outlet } from "react-router-dom";
import NewsList from "../../features/new/NewsList";
import classes from "./News.module.css";
import { getNews } from "../../helpers/news/getNews";
import { FaEnvelope } from "react-icons/fa6";

const News = () => {
  return (
    <>
      <Outlet />
      <main className={classes.newsContainer}>
        <Link to="/dashboard/create-new" className={classes.create}>
          <FaEnvelope />
          <p className={classes.label}>Create New</p>
        </Link>
        <NewsList />
      </main>
    </>
  );
};

export default News;

export const loader = async () => {
  const response = await getNews();
  return response;
};
