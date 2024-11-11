import { Link, Outlet } from "react-router-dom";
import classes from "./Customers.module.css";
import CustomersList from "../../features/customers/CustomersList.js";
import { getAllUsers } from "../../helpers/usersHelper.js";
import { FaEnvelope } from "react-icons/fa6";

const Customers = () => {
  return (
    <>
      <>
        <Outlet />
        <main className={classes.customersContainer}>
          <h1 className={classes.contentTitle}>Customers</h1>

          <Link to="create-user" className={classes.create}>
            <FaEnvelope />
            <p className={classes.label}>Create user</p>
          </Link>
          <CustomersList />
        </main>
      </>
    </>
  );
};

export default Customers;

export const loader = async () => {
  const response = await getAllUsers();
  return response;
};
