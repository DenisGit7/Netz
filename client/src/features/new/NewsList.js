import { useLoaderData } from "react-router-dom";
import classes from "./NewsList.module.css";
import New from "./New.js";

const NewsList = () => {
  const data = useLoaderData();
  const news = data.news;
  return (
    <>
      {news.length > 0 && (
        <>
          <h1 className={classes.contentTitle}>Notifications</h1>
          <ul className={classes.news}>
            {news.map((newItem) => (
              <New
                key={newItem._id}
                id={newItem._id}
                title={newItem.title}
                content={newItem.content}
              />
            ))}
          </ul>
        </>
      )}

      {news.length === 0 && (
        <p className={classes.text}>There are no news yet</p>
      )}
    </>
  );
};

export default NewsList;
