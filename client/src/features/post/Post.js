import { Link } from "react-router-dom";
import classes from "./Post.module.css";

const Post = ({ id, title, content }) => {
  const maxLengthTitle = 30;
  const maxLengthContent = 500;
  return (
    <li className={classes.post}>
      <Link to={`/dashboard/post/${id}`}>
        <p className={classes.title}>
          {" "}
          {title.length > maxLengthTitle
            ? title.slice(0, maxLengthTitle) + "..."
            : title}
        </p>

        <div className={classes.content}>
          <p>
            {content.length > maxLengthContent
              ? content.slice(0, maxLengthContent) + "..."
              : content}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Post;
