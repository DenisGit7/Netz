import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import classes from "./Authentication.module.css";
import { handleLogin } from "../../helpers/auth/handleLogin.js";
import { handleLogout } from "../../helpers/auth/handleLogout.js";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext.js";

const Authentication = ({ onLogin, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { isLoggedIn, userInformation } = useSession();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await handleLogin(username, password);

      if (result.username && result.role) {
        setUsername("");
        setPassword("");
        toast.success(`Welcome ${result.username}`);
        onLogin(result);
      } else if (result.status === 401) {
        console.log("User not found");
        setUsername("");
        setPassword("");
        setMessage("Wrong user or password");
        toast.error(message);
      } else if (result.status === 400) {
        console.log("Both fields are required");
        setUsername("");
        setPassword("");
        setMessage("Both fields are required");

        toast.error(message);
      }
    } catch (error) {
      console.log("error");
      setUsername("");
      setPassword("");
      setMessage("");
      toast.error(error);
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await handleLogout();
      if (result) {
        onLogout(result);
        toast.success("Goodbye");
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
      console.log("error");
    }
  };

  return (
    <div className={classes.authContainer}>
      {isLoggedIn ? (
        <ul className={classes.list}>
          <li className={classes.element}>
            <p className={classes.label}>{userInformation.username}</p>
          </li>
          <button className={classes.authBtn} onClick={(e) => logoutHandler(e)}>
            Logout
          </button>
        </ul>
      ) : (
        <div>
          <form className={classes.formContainer} onSubmit={loginHandler}>
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              required
              value={username}
              onChange={(e) => setUsername(() => e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />
            <button className={classes.authBtn} type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;
