import { Link } from "react-router-dom";
import classes from "./Post.module.css";

const Post = ({ id, title, content }) => {
  const maxLength = 30;
  return (
    <li className={classes.post}>
      <Link to={`/dashboard/post/${id}`}>
        <p className={classes.title}>{title}</p>
        <p className={classes.content}>
          {content.length > maxLength
            ? content.slice(0, maxLength) + "..."
            : content}
        </p>
      </Link>
    </li>
  );
};

export default Post;
