import { Outlet } from "react-router-dom";
import classes from "./Dashboard.module.css";
import { useSession } from "../context/SessionContext";
const Dashboard = () => {
  return (
    <>
      <main>
        <div className={classes.container}>
          <Outlet />
        </div>
        <div className={classes.newsContainer}></div>
        <div className={classes.filesContainer}></div>
        <div className={classes.userContainer}></div>
      </main>
    </>
  );
};

export default Dashboard;
