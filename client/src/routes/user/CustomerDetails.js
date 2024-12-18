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
import apiUrl from "../../service/api";

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
    if (res?.status === 409) {
      toast.error("User already exists", { duration: 2000 });
      setRes("");
    }
  }

  const id = user._id;

  const deleteHandler = async () => {
    try {
      toast.loading("Waiting...", { duration: 3000 });

      const result = await removeUser(id);
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
              <label htmlFor="password">Password</label>
              <input
                placeholder="Enter new password"
                name="password"
                type="text"
                id="password"
              />
            </p>
            <p>
              <label htmlFor="firstName">First name</label>
              <input
                defaultValue={user.firstName}
                name="firstName"
                type="text"
                id="firstName"
              />
            </p>
            <p>
              <label htmlFor="lastName">Last name</label>
              <input
                defaultValue={user.lastName}
                name="lastName"
                type="text"
                id="lastName"
              />
            </p>
            <p>
              <label htmlFor="buisnessId">Buisness ID</label>
              <input
                defaultValue={user.buisnessId}
                name="buisnessId"
                type="text"
                id="buisnessId"
              />
            </p>
            <p>
              <label htmlFor="sector">Buisness sector</label>
              <input
                defaultValue={user.sector}
                name="sector"
                type="text"
                id="sector"
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input
                defaultValue={user.email}
                name="email"
                type="text"
                id="email"
              />
            </p>
            <p>
              <label htmlFor="phone">Phone</label>
              <input
                defaultValue={user.phone}
                name="phone"
                type="text"
                id="phone"
              />
            </p>
            <p>
              <label htmlFor="description">Description</label>
              <input
                defaultValue={user.description}
                name="description"
                type="text"
                id="description"
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
            <h2 className={classes.user}>{user.username}</h2>
            <div>
              <h3>Role:</h3>
              <h3>{user.role}</h3>
            </div>
            <div>
              <h3>First name:</h3>
              <h3>{user.firstName}</h3>
            </div>
            <div>
              <h3>Last name:</h3>
              <h3>{user.lastName}</h3>
            </div>
            <div>
              <h3>Buisness ID:</h3>
              <h3>{user.buisnessId}</h3>
            </div>
            <div>
              <h3>Buisness sector:</h3>
              <h3>{user.sector}</h3>
            </div>
            <div>
              <h3>Buisness sector:</h3>
              <h3>{user.sector}</h3>
            </div>
            <div>
              <h3>Email:</h3>
              <h3>{user.email}</h3>
            </div>
            <div>
              <h3>Phone:</h3>
              <h3>{user.phone}</h3>
            </div>
            <div>
              <h3>Description:</h3>
              <h3>{user.description}</h3>
            </div>
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
  return user;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.id;
  const userData = Object.fromEntries(formData);
  try {
    const response = await axios.patch(`${apiUrl}/customers/${id}`, {
      password: userData.password,
      buisnessId: userData.buisnessId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      sector: userData.sector,
      phone: userData.phone,
      description: userData.description,
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }

  // return redirect("/dashboard/customers");
};
