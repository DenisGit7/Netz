import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import classes from "./EditPost.module.css";
import { editPost } from "../../helpers/posts/editPost.js";

const EditPost = ({}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return <div className={classes.container}></div>;
};

export default EditPost;
