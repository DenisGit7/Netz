import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import classes from "./CreateNew.module.css";
import { createNew } from "../../helpers/news/createNew.js";

const CreateNew = ({
  role,
  setLoading,
  setShCrtNws,
  setShCrtUsr,
  setShowCustomers,
  setShUp,
  setShNv,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  useEffect(() => {
    setShCrtUsr(false);
    setShUp(false);
    setShNv(false);

    setShowCustomers(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createNew(newTitle, newContent);
      toast.success("New Submitted");
      console.log(result);
    } catch (error) {
      toast.error(error);
    }
    setNewTitle("");
    setNewContent("");
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <button onClick={() => setShCrtNws(false)}>Close</button>

      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          className={classes.text}
          required
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(() => e.target.value)}
        />
        <textarea
          placeholder="Notification Content"
          required
          cols={40}
          rows={20}
          wrap="soft"
          value={newContent}
          onChange={(e) => setNewContent(() => e.target.value)}
        />
        <button
          className={classes.newButton}
          // disabled={role === 'Admin'}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
