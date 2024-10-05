import { Link, Outlet } from "react-router-dom";
import PostsList from "../features/post/PostsList";
import classes from "./Posts.module.css";
import { FaEnvelope } from "react-icons/fa6";
import { getPosts } from "../helpers/posts/getPosts";

const Posts = () => {
  return (
    <>
      <Outlet />
      <main className={classes.postsContainer}>
        <Link to="create-post" className={classes.element}>
          <FaEnvelope />
          <p className={classes.label}>Create Post</p>
        </Link>
        <PostsList />
      </main>
    </>
  );
};

export default Posts;

export const loader = async () => {
  const response = await getPosts();
  return response;
};

//instead of having getPosts() here, we can have the get request directly here, but this is not required, since loader works every time
