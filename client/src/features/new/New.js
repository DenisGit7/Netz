import { Link } from "react-router-dom";
import classes from "./New.module.css";

const New = ({ id, title, content }) => {
  return (
    <li className={classes.new}>
      <Link to={`/dashboard/new/${id}`}>
        <p className={classes.title}>{title}</p>
        <p className={classes.content}>{content}</p>
      </Link>
    </li>
  );
};

export default New;
