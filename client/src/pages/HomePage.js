import Posts from "../routes/post/Posts";
import News from "../routes/new/News";
import classes from "../pages/HomePage.module.css";
import { Outlet } from "react-router-dom";
const HomePage = () => {
  return (
    <div className={classes.container}>
      <Outlet />
      <Posts />
      <News />
    </div>
  );
};

export default HomePage;
