import { Link } from "react-router-dom";
import classes from "./New.module.css";

const New = ({ id, title, content }) => {
  const maxLength = 30;

  return (
    <li className={classes.new}>
      <Link to={`/dashboard/new/${id}`}>
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

export default New;
