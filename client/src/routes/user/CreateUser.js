import axios from "axios";
import { useEffect, useState } from "react";

import {
  Link,
  Form,
  redirect,
  useLoaderData,
  useActionData,
  useNavigate,
} from "react-router-dom";
import classes from "./CreateUser.module.css";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
const CreateUser = () => {
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
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
    if (response?.status === 409) {
      setRes("");
      toast.error("User already exists");
    }
    if (response?.status === 201) {
      setRes("");
      toast.success("User registred successfully");
      navigate("/dashboard/customers");
    }
  } else {
  }

  return (
    <Modal>
      <Form
        method="post"
        className={classes.form}
        onSubmit={() => setLoading(true)}
      >
        <p>
          <input
            name="username"
            type="text"
            required
            className={classes.input}
            placeholder="Username"
          />
        </p>
        <p>
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </p>
        <p>
          {" "}
          <input
            type="text"
            name="firstName"
            className={classes.input}
            placeholder="First Name"
          />
        </p>
        <p>
          <input
            type="text"
            name="lastName"
            className={classes.input}
            placeholder="Last Name"
          />
        </p>
        <p>
          {" "}
          <input
            type="text"
            name="buisnessId"
            className={classes.input}
            placeholder="Buisness ID"
          />
        </p>
        <p>
          {" "}
          <input
            type="text"
            name="sector"
            className={classes.input}
            placeholder="Buisness Sector"
          />
        </p>
        <p>
          <input
            type="text"
            name="email"
            className={classes.input}
            placeholder="Email"
          />
        </p>
        <p>
          <input
            type="text"
            name="phone"
            className={classes.input}
            placeholder="Phone"
          />
        </p>
        <p>
          {" "}
          <input
            type="text"
            name="description"
            className={classes.input}
            placeholder="Description"
          />
        </p>

        <p className={classes.opt}>
          <select name="role" type="text">
            <option value="Customer">Customer</option>

            <option value="Admin">Admin</option>
          </select>
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            <button className={classes.actions}>Cancel</button>
          </Link>
          <button>Create</button>
        </p>
      </Form>
    </Modal>
  );
};

export default CreateUser;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const userData = Object.fromEntries(formData);
  try {
    const response = await axios.post("http://localhost:3500/users/register", {
      username: userData.username,
      password: userData.password,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      buisnessId: userData.buisnessId,
      sector: userData.sector,
      email: userData.email,
      phone: userData.phone,
      description: userData.description,
    });
    return response;
  } catch (error) {
    console.error("Register error: ", error);
    console.error("Error message: ", error.response.data.message);
    return error.response;
  }

  // return redirect("/dashboard/customers");
};
