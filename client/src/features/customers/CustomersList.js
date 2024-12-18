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
  }, [searchValue, rawUsers, customers]);

  return (
    <div className={classes.mainContainer}>
      <input
        className={classes.search}
        type="search"
        id="search"
        placeholder="Username"
        value={searchValue}
        // onChange={(e) => setSearchValue(() => e.target.value)}
        onChange={(e) => {
          setSearchValue(() => e.target.value);
        }}
      />
      <div className={classes.listContainer}>
        {rawUsers.length > 0 && (
          <div className={classes.customers}>
            {rawUsers.map(
              (customer) =>
                customer.username !== "Admin" && (
                  <Customer
                    key={customer._id}
                    id={customer._id}
                    username={customer.username}
                  />
                )
            )}
          </div>
        )}

        {rawUsers.length === 0 && (
          <p className={classes.text}>There are no customers yet</p>
        )}
      </div>
    </div>
  );
};

export default CustomersList;
