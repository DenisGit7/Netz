import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import classes from "./ViewPosts.module.css";
import { getPosts } from "../../helpers/posts/getPosts.js";
import { deletePost } from "../../helpers/posts/deletePost.js";
import { editPost } from "../../helpers/posts/editPost.js";
import EditPost from "./EditPost.js";

const ViewPosts = ({ setLoading, loading, role }) => {
  const [posts, setPosts] = useState([]);
  const [rawPosts, setRawPosts] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [loading, role, editing]);

  useEffect(() => {
    if (rawPosts.length >= 0) {
      const rawPostsMap = rawPosts.map((rawPost, index) => {
        const id = rawPost._id;
        return (
          <div className={classes.post} key={index}>
            <>
              <h2>{rawPost.title}</h2>
              <h3>{rawPost.content}</h3>
              <h3>{rawPost.updated}</h3>

              {role === "Admin" ? (
                <>
                  <button
                    className={classes.newButton}
                    onClick={(e) => handleDeletePost(e, id)}
                  >
                    Delete
                  </button>
                  <button
                    className={classes.newButton}
                    onClick={(e) => handleEditPost(e, id)}
                  >
                    Edit
                  </button>
                </>
              ) : (
                ""
              )}
            </>
          </div>
        );
      });
      setPosts(rawPostsMap);
    }
    console.log(posts);
  }, [rawPosts]);

  const fetchData = async () => {
    setLoading(true);
    const promise = Promise.resolve(getPosts());
    promise.then((value) => {
      console.log(value);
      setRawPosts(value);
    });
    setLoading(false);
  };

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await deletePost(id);
      console.log(result);
      toast.success("Post Deleted");
    } catch (error) {
      toast.error(error);
    }
    fetchData();
    setLoading(false);
  };
  const handleEditPost = async (e, id) => {
    e.preventDefault();
    console.log("EDITING");
    setEditing(true);
    setLoading(true);
    const title = "test";
    const content = "test";

    // try {
    //   const result = await editPost(id, title, content);
    //   console.log(result);
    //   toast.success("Post Edited");
    // } catch (error) {
    //   toast.error(error);
    // }
    // fetchData();
    setLoading(false);
  };

  return (
    <>
      <div className={classes.container}>
        <h1>Posts</h1>
        {posts}
      </div>
    </>
  );
};

export default ViewPosts;
