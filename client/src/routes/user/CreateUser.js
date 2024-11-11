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
    });
    return response;
  } catch (error) {
    console.error("Register error: ", error);
    console.error("Error message: ", error.response.data.message);
    return error.response;
  }

  // return redirect("/dashboard/customers");
};
