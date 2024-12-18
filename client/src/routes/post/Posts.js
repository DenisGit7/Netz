import { Link, Outlet } from "react-router-dom";
import PostsList from "../../features/post/PostsList";
import classes from "./Posts.module.css";
import { getPosts } from "../../helpers/posts/getPosts";
import { FaEnvelope } from "react-icons/fa6";
import { useSession } from "../../context/SessionContext";
import { useState } from "react";

const Posts = () => {
  const { isLoggedIn, userInformation } = useSession();
  const [userClass, setUserClass] = useState(() => {
    if (userInformation?.role.includes("Admin")) {
      return `${classes.postsContainer} ${classes.postsContainerAdmin}`;
    } else {
      return `${classes.postsContainer}`;
    }
  });

  return (
    <>
      <Outlet />
      <div className={userClass}>
        {userInformation?.role?.includes("Admin") && (
          <Link to="/dashboard/create-post" className={classes.create}>
            <FaEnvelope />
            <p className={classes.label}>Create Post</p>
          </Link>
        )}

        <PostsList />
      </div>
    </>
  );
};

export default Posts;

export const loader = async () => {
  const response = await getPosts();
  return response;
};

//instead of having getPosts() here, we can have the get request directly here, but this is not required, since loader works every time
