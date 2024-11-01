import { useLoaderData } from "react-router-dom";
import classes from "./PostsList.module.css";
import Post from "./Post.js";

const PostsList = () => {
  const data = useLoaderData();

  const posts = data.posts;
  return (
    <>
      {posts.length > 0 && (
        <>
          <h1 className={classes.contentTitle}>Posts</h1>
          <ul className={classes.posts}>
            {posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.content}
              />
            ))}
          </ul>
        </>
      )}

      {posts.length === 0 && (
        <p className={classes.text}>There are no posts yet</p>
      )}
    </>
  );
};

export default PostsList;
