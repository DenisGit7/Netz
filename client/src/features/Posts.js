import React from "react";
import { useState, useEffect } from "react";
import classes from "./Posts.module.css";
import { getPosts } from "../helpers/posts/getPosts.js";
import { createPost } from "../helpers/posts/createPost.js";
import { deletePost } from "../helpers/posts/deletePost.js";

const Posts = (role) => {
  const [posts, setPosts] = useState([]);
  const [rawPosts, setRawPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (rawPosts.length > 0) {
      const rawPostsMap = rawPosts.map((rawPost, index) => {
        const id = rawPost._id;
        return (
          <div key={index}>
            <h2>{rawPost.title}</h2>
            <h3>{rawPost.content}</h3>
            <h3>{rawPost.updated}</h3>
            <button onClick={(e) => handleDeletePost(e, id)}>Delete</button>
          </div>
        );
      });
      setPosts(rawPostsMap);
    }
    console.log(posts);
  }, [rawPosts]);

  const fetchData = async () => {
    const promise = Promise.resolve(getPosts());
    promise.then((value) => {
      console.log(value);
      setRawPosts(value);
    });
  };

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    try {
      const result = await deletePost(id);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createPost(newTitle, newContent);
      console.log(result);
    } catch (error) {
      console.log("error");
    }
    fetchData();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTitle.title}
          onChange={(e) => setNewTitle(() => e.target.value)}
        />
        <input
          type="password"
          value={newContent}
          onChange={(e) => setNewContent(() => e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      {loading ? <div>{posts}</div> : ""}
    </>
  );
};

export default Posts;
