import React from "react";
import { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
import { createUser } from "../helpers/auth/createUser";

const CreateUser = () => {
  const [newUser, setNewUser] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newRole, setNewRole] = useState("Customer");
  const [message, setMessage] = useState("");

  const handeCreate = async (e) => {
    e.preventDefault();
    if (!newUser || !newPwd || !newRole) {
      setMessage("All fields are reuired");
    } else {
      try {
        const result = await createUser(newUser, newPwd, newRole);
        if (result.status === 409) {
          // User already exist
          setMessage(result.response.data.message);
        } else if (result.status === 201) {
          // User created
          setMessage(result.data.message);
          setNewPwd("");
          setNewUser("");
          setNewRole("Customer");
        } else {
          setNewPwd("");
          setNewUser("");
          setNewRole("Customer");
          setMessage("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={classes.arrowContainer}>
      <form onSubmit={handeCreate}>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(() => e.target.value)}
        />
        <input
          type="password"
          value={newPwd}
          onChange={(e) => setNewPwd(() => e.target.value)}
        />
        <select
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(() => e.target.value)}
        >
          <option value="Admin ">Admin</option>
          <option value="Customer">Customer</option>
        </select>
        <button type="submit">Register</button>
      </form>

      <label>{message}</label>
    </div>
  );
};

export default CreateUser;
