import axios from "axios";
import {
  useLoaderData,
  Link,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import Modal from "../components/Modal";
import classes from "./CustomerDetails.module.css";
import { getUser, getAllUsers, removeUser } from "../helpers/usersHelper";
import { useState } from "react";

function CustomerDetails() {
  const [editing, setEditing] = useState(false);
  const user = useLoaderData();
  const navigate = useNavigate();

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
    navigate("/customers");
  };

  if (!user) {
    return (
      // User not found display
      <Modal>
        <main className={classes.details}>
          <h2 className={classes.content}>Could not find user</h2>
          <p className={classes.content}>
            Unfortunately, the requested user could not be found.
          </p>
          <p>
            <Link to="/customers" className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <>
      {/* Edit user
      {editing && (
        <Modal>
          <Form method="post" className={classes.form}>
            <p>
              <label htmlFor="title">User Title</label>
              <input
                defaultValue={title}
                name="title"
                type="text"
                id="title"
                required
              />
            </p>

            <p>
              <label htmlFor="content">Content</label>
              <textarea
                defaultValue={content}
                name="content"
                id="content"
                required
                rows={7}
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
      )} */}

      {/* View user */}
      {!editing && (
        <Modal>
          <main className={classes.details}>
            <h3 className={classes.title}>Username: {user.username}</h3>
            <p className={classes.content}>Role: {user.role}</p>
          </main>
          <div className={classes.actions}>
            <Link to="/customers" className={classes.btn}>
              <button onClick={deleteHandler}>Delete User</button>
            </Link>
            {/* <button
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit User
            </button> */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default CustomerDetails;

export const loader = async ({ params }) => {
  const user = await getUser(params.id);
  console.log(user);
  return user;
};

// export const action = async ({ request, params }) => {
//   const formData = await request.formData();

//   const title = formData.get("title");
//   const content = formData.get("content");

//   const id = params.id;

//   const userData = Object.fromEntries(formData);

//   // try {
//   //   //I GOT UP TO HERE, following this line there is internal server error 500, probably the patch url or backend code
//   //   await axios.patch(`http://localhost:3500/posts/edit/${id}`, {
//   //     newTitle: postData.title,
//   //     newContent: postData.content,
//   //   });
//   // } catch (error) {
//   //   console.log(Error);
//   // }

//   return redirect("/customers");
// };
