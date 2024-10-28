import axios from "axios";
import { Link, Form, redirect } from "react-router-dom";
import classes from "./CreateUser.module.css";
import Modal from "../../components/Modal";

const CreateUser = () => {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
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
          <select name="role" type="text">
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
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
    await axios.post("http://localhost:3500/users/register", {
      username: userData.username,
      password: userData.password,
      role: userData.role,
    });
  } catch (error) {
    console.error("Register error: ", error);
    console.error("Error message: ", error.response.data.message);
    return error;
  }

  return redirect("/dashboard/customers");
};
