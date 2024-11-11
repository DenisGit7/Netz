import { useEffect, useState } from "react";
import axios from "axios";
import {
  useLoaderData,
  Outlet,
  Link,
  Form,
  redirect,
  useNavigate,
  useActionData,
} from "react-router-dom";
import toast from "react-hot-toast";

import Modal from "../../components/Modal";
import classes from "./CustomerDetails.module.css";
import { getUser, removeUser } from "../../helpers/usersHelper";

const CustomerDetails = () => {
  const [editing, setEditing] = useState(false);
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useLoaderData();
  const navigate = useNavigate();
  const response = useActionData();

  useEffect(() => {
    setRes(response);
  }, [response]);

  if (loading) {
    toast.loading("Waiting...", { duration: 3000 });
    setLoading(false);
  }
  if (res?.status) {
    setLoading(false);
    toast.dismiss();

    if (res.status === 201) {
      toast.success("User updated", { duration: 2000 });
      setRes("");
      navigate("/dashboard/customers");
    }
    console.log(res);
    if (res?.status === 409) {
      toast.error("User already exists", { duration: 2000 });
      setRes("");
    }
  }

  const username = user.username;
  const id = user._id;

  const deleteHandler = async () => {
    try {
      toast.loading("Waiting...", { duration: 3000 });

      const result = await removeUser(id);
      console.log(result);
      if (result?.status === 200) {
        toast.dismiss();
        toast.success("User deleted", { duration: 2000 });
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error, { duration: 2000 });
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
          <Form
            method="post"
            className={classes.form}
            onSubmit={() => setLoading(true)}
          >
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
            <h3 className={classes.user}>{user.username}</h3>
            <p className={classes.role}>Role: {user.role}</p>
          </main>
          <div className={classes.actions}>
            <Link to=".." type="button">
              <button>Cancel</button>
            </Link>
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
  const id = params.id;
  const userData = Object.fromEntries(formData);

  try {
    const response = await axios.patch(
      `http://localhost:3500/customers/${id}`,
      {
        username: userData.username,
      }
    );
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }

  // return redirect("/dashboard/customers");
};
