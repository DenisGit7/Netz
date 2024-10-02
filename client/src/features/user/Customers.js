import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import classes from "./Customers.module.css";
import { removeUser, getAllUsers, getUser } from "../../helpers/usersHelper.js";

const Customers = ({
  setLoading,
  setShCrtPst,
  setShCrtNws,
  setShCrtUsr,
  setShUp,
  setShNv,
}) => {
  const [users, setUsers] = useState([]);
  const [rawUsers, setRawUsers] = useState([]);
  const [sourceUsers, setSourceUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchData();
    setShCrtUsr(false);
    setShCrtPst(false);
    setShCrtNws(false);
    setShUp(false);
    setShNv(false);
  }, []);

  useEffect(() => {
    const filteredUsers = rawUsers.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRawUsers(filteredUsers);
    if (!searchValue) {
      fetchData();
    }
  }, [searchValue]);

  useEffect(() => {
    if (rawUsers.length >= 0) {
      const rawUsersMap = rawUsers.map((rawUser, index) => {
        const id = rawUser._id;
        return (
          <div key={index}>
            <h2>{rawUser.username}</h2>

            <button
              className={classes.newButton}
              onClick={(e) => handleRemoveUser(e, id)}
            >
              Remove
            </button>
          </div>
        );
      });
      setUsers(rawUsersMap);
    }
  }, [rawUsers]);

  const fetchData = async () => {
    setLoading(true);
    const promise = Promise.resolve(getAllUsers());
    promise.then((value) => {
      setRawUsers(value.data);
      setSourceUsers(value.data);
    });

    setLoading(false);
  };

  const handleRemoveUser = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await removeUser(id);
      toast.success("User Removed");
    } catch (error) {
      toast.error(error);
    }
    fetchData();
    setLoading(false);
  };

  return (
    <>
      <div className={classes.container}>
        <label className={classes.label} for="search">
          Search by id:
        </label>
        <input
          className={classes.label}
          type="search"
          id="search"
          placeholder="User id..."
          value={searchValue}
          // onChange={(e) => setSearchValue(() => e.target.value)}
          onChange={(e) => {
            setSearchValue(() => e.target.value);
            setRawUsers(sourceUsers);
          }}
        />
      </div>
      <div className={classes.container}>{users}</div>
    </>
  );
};

export default Customers;
