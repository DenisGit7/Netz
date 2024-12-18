import React from "react";
import classes from "../pages/Error.module.css";

const Error = () => {
  console.log(process.env.REACT_APP_APIURI);

  return (
    <div className={classes.container}>
      <h1>Something went wrong...</h1>
      <h1>404</h1>
    </div>
  );
};

export default Error;
