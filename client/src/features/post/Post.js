import { Link } from "react-router-dom";
import classes from "./Post.module.css";

const Post = ({ id, title, content }) => {
  const maxLengthTitle = 30;
  const maxLengthContent = 700;
  return (
    <li className={classes.post}>
      <Link to={`/dashboard/post/${id}`}>
        <p className={classes.title}>
          {" "}
          {title.length > maxLengthTitle
            ? title.slice(0, maxLengthTitle) + "..."
            : title}
        </p>
        <p className={classes.content}>
          {content.length > maxLengthContent
            ? content.slice(0, maxLengthContent) + "..."
            : content}
        </p>
      </Link>
    </li>
  );
};

export default Post;
