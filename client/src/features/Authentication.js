import React from "react";
import { useState, useEffect } from "react";
import classes from "./Authentication.module.css";
import { handleLogin } from "../helpers/auth/handleLogin.js";
import { handleLogout } from "../helpers/auth/handleLogout.js";

const Authentication = ({ user, setUser, role, setRole }) => {
  const [pwd, setPwd] = useState("");
  const [login, setLogin] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handleLogin(login, pwd);
      console.log(result);
      if (result.username && result.role) {
        setUser(result.username);
        setRole(result.role);
        setLogin("");
        setPwd("");
        setMessage("");
        console.log(pwd, login);
      } else if (result.status === 401) {
        console.log("User not found");
        setRole("");
        setMessage("Wrong user or password");
      } else if (result.status === 400) {
        console.log("Both fields are required");
        setRole("");

        setMessage("Both fields are required");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const logout = async (e) => {
    e.preventDefault();
    try {
      const result = await handleLogout();
      setUser("");
      setRole("");
      console.log(result);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {user ? (
        <button onClick={(e) => logout(e)}>Logout</button>
      ) : (
        <div className={classes.arrowContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(() => e.target.value)}
            />
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(() => e.target.value)}
            />
            <button type="submit">Login</button>
          </form>

          <label>{message}</label>
        </div>
      )}
    </>
  );
};

export default Authentication;
