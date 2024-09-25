import React from "react";
import { useState, useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import { getList } from "../helpers/getList.js";
import classes from "./FileList.module.css";
import { handleLogin } from "../helpers/handleLogin.js";
import { handleLogout } from "../helpers/handleLogout.js";
import { createUser } from "../helpers/createUser.js";

const Authentication = ({ user, setUser, role, setRole }) => {
  const [pwd, setPwd] = useState([]);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handleLogin(user, pwd);
      console.log(result);
      if (result.username && result.role) {
        setUser(result.username);
        setRole(result.role);
        setMessage("");
      } else if (result.status === 401) {
        console.log("User not found");
        setRole([]);
        setMessage("Wrong user or password");
      } else if (result.status === 400) {
        console.log("Both fields are required");
        setRole([]);

        setMessage("Both fields are required");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className={classes.arrowContainer}>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setUser(() => e.target.value)} />
        <input type="password" onChange={(e) => setPwd(() => e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <label>{message}</label>
    </div>
  );
};

export default Authentication;
