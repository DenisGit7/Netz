import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import classes from "./ViewNews.module.css";
import { getNews } from "../../helpers/news/getNews.js";
import { deleteNew } from "../../helpers/news/deleteNew.js";

const ViewNews = ({ setLoading, loading, role }) => {
  const [news, setNews] = useState([]);
  const [rawNews, setRawNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, [loading, role]);

  useEffect(() => {
    if (rawNews.length >= 0) {
      const rawNewsMap = rawNews.map((rawNew, index) => {
        const id = rawNew._id;

        return (
          <div className={classes.new} key={index}>
            <h2>{rawNew.title}</h2>
            <h3>{rawNew.content}</h3>
            <h3>{rawNew.updated}</h3>
            {role === "Admin" ? (
              <button
                className={classes.newButton}
                onClick={(e) => handleDeleteNew(e, id)}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        );
      });
      setNews(rawNewsMap);
    }
    console.log(news);
  }, [rawNews]);

  const fetchData = async () => {
    setLoading(true);
    const promise = Promise.resolve(getNews());
    promise.then((value) => {
      console.log(value);
      setRawNews(value);
    });
    setLoading(false);
  };

  const handleDeleteNew = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    console.log("========");
    try {
      const result = await deleteNew(id);
      console.log(result);
      toast.success("New Deleted");
    } catch (error) {
      toast.error(error);
    }
    fetchData();
    setLoading(false);
  };

  return (
    <>
      <div className={classes.container}>
        <h1>Notifications</h1>
        {news}
      </div>
    </>
  );
};

export default ViewNews;
