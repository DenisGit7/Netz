import React from "react";
import classes from "./Header.module.css";
import Authentication from "../features/Authentication";

const Header = ({ title, user, setUser, role, setRole }) => {
  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      <p className={classes.welcome}>Welcome {user},</p>
      <Authentication
        user={user}
        setUser={setUser}
        role={role}
        setRole={setRole}
      />
    </div>
  );
};

export default Header;
