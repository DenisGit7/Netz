import { useLoaderData } from "react-router-dom";
import classes from "./CustomersList.module.css";
import Customer from "./Customer.js";
import { useState, useEffect } from "react";

const CustomersList = () => {
  const customers = useLoaderData();
  const [searchValue, setSearchValue] = useState("");
  const [rawUsers, setRawUsers] = useState([]);

  useEffect(() => {
    const filteredUsers = customers.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRawUsers(filteredUsers);
    if (!searchValue) {
      setRawUsers(customers);
    }
  }, [searchValue]);

  return (
    <>
      <input
        className={classes.label}
        type="search"
        id="search"
        placeholder="Username"
        value={searchValue}
        // onChange={(e) => setSearchValue(() => e.target.value)}
        onChange={(e) => {
          setSearchValue(() => e.target.value);
        }}
      />
      {rawUsers.length > 0 && (
        <ul className={classes.customers}>
          <h1>Customers</h1>
          {rawUsers.map((customer) => (
            <Customer
              key={customer._id}
              id={customer._id}
              username={customer.username}
            />
          ))}
        </ul>
      )}

      {rawUsers.length === 0 && (
        <p className={classes.text}>There are no customers yet</p>
      )}
    </>
  );
};

export default CustomersList;
