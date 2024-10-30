import { useLoaderData } from "react-router-dom";
import classes from "./NewsList.module.css";
import New from "./New.js";

const NewsList = () => {
  const data = useLoaderData();
  const news = data.news;
  return (
    <>
      {news.length > 0 && (
        <ul className={classes.news}>
          <h1>Notifications</h1>
          {news.map((newItem) => (
            <New
              key={newItem._id}
              id={newItem._id}
              title={newItem.title}
              content={newItem.content}
            />
          ))}
        </ul>
      )}

      {news.length === 0 && (
        <p className={classes.text}>There are no news yet</p>
      )}
    </>
  );
};

export default NewsList;
