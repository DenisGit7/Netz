import { Link } from "react-router-dom";
import classes from "./Customer.module.css";

const Customer = ({ id, username }) => {
  return (
    <div className={classes.list}>
      <Link to={`/dashboard/customers/${id}`}>
        <p className={classes.title}>{username}</p>
      </Link>
    </div>
  );
};

export default Customer;
