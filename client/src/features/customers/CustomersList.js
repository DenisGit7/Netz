import { useLoaderData } from "react-router-dom";
import classes from "./CustomersList.module.css";
import Customer from "./Customer.js";

const CustomersList = () => {
  const customers = useLoaderData();
  return (
    <>
      {customers.length > 0 && (
        <ul className={classes.posts}>
          <h1>Customers</h1>
          {customers.map((customer) => (
            <Customer
              key={customer._id}
              id={customer._id}
              username={customer.username}
            />
          ))}
        </ul>
      )}

      {customers.length === 0 && (
        <p className={classes.post}>There are no customers yet</p>
      )}
    </>
  );
};

export default CustomersList;
