import { useState } from "react";
import axios from "axios";
import {
  useLoaderData,
  Outlet,
  Link,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import Modal from "../../components/Modal";
import classes from "./CustomerDetails.module.css";
import { getUser, removeUser } from "../../helpers/usersHelper";

const CustomerDetails = () => {
  const [editing, setEditing] = useState(false);
  const user = useLoaderData();
  const navigate = useNavigate();

  const username = user.username;

  const id = user._id;
  const deleteHandler = async () => {
    try {
      const result = await removeUser(id);

      if (result.status === 201) {
        toast.success("User deleted");
      }
    } catch (error) {
      toast.error(error);
    }
    navigate("/dashboard/customers");
  };

  if (!user) {
    return (
      // User not found display
      <Modal>
        <main className={classes.details}>
          <h2 className={classes.role}>Could not find user</h2>
          <p className={classes.role}>
            Unfortunately, the requested user could not be found.
          </p>
          <p>
            <Link to="/dashbaord/customers" className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <>
      <Outlet />
      {/* Edit user */}
      {editing && (
        <Modal>
          <Form method="post" className={classes.form}>
            <p>
              <label htmlFor="username">Username</label>
              <input
                defaultValue={username}
                name="username"
                type="text"
                id="username"
                required
              />
            </p>

            <p className={classes.actions}>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                }}
              >
                Cancel
              </button>
              <button>Update User</button>
            </p>
          </Form>
        </Modal>
      )}

      {/* View user */}
      {!editing && (
        <Modal>
          <main className={classes.details}>
            <h3 className={classes.user}>Username: {user.username}</h3>
            <p className={classes.role}>Role: {user.role}</p>
          </main>
          <div className={classes.actions}>
            <Link to="/dashboard/customers" className={classes.btn}>
              <button onClick={deleteHandler}>Delete User</button>
            </Link>
            <button
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit User
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CustomerDetails;

export const loader = async ({ params }) => {
  const user = await getUser(params.id);
  // console.log(user)
  return user;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  const username = formData.get("username");
  console.log(1, username);

  const id = params.id;
  console.log(2, id);

  const userData = Object.fromEntries(formData);

  console.log(3, userData);
  try {
    await axios.patch(`http://localhost:3500/customers/${id}`, {
      username: userData.username,
    });
  } catch (error) {
    console.log(Error);
  }

  return redirect("/dashboard/customers");
};
