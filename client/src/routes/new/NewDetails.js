import { useState } from "react";
import axios from "axios";
import {
  useLoaderData,
  Link,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import apiUrl from "../../service/api";

import Modal from "../../components/Modal";
import classes from "./NewDetails.module.css";
import { deleteNew } from "../../helpers/news/deleteNew";
import { getNew } from "../../helpers/news/getNews";
import { useSession } from "../../context/SessionContext";

const NewDetails = () => {
  const { isLoggedIn, userInformation } = useSession();

  const [editing, setEditing] = useState(false);
  const newItem = useLoaderData();
  const navigate = useNavigate();

  const { title, content } = newItem;
  const id = newItem._id;

  const deleteHandler = async () => {
    try {
      const result = await deleteNew(id);

      if (result.status === 201) {
        toast.success("Notificaton deleted");
      }
    } catch (error) {
      toast.error(error);
    }
    navigate("/dashboard");
  };
  const closeHandler = async () => {
    navigate("/dashboard");
  };

  if (!newItem) {
    return (
      // New not found display
      <Modal>
        <main className={classes.details}>
          <h2 className={classes.content}>Could not find new</h2>
          <p className={classes.content}>
            Unfortunately, the requested Notification could not be found.
          </p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <>
      {/* Edit new */}
      {editing && (
        <Modal>
          <Form method="post" className={classes.form}>
            <p>
              <label htmlFor="title">Notifications Title</label>
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
                className={classes.textContent}
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
              <button>Update Notification</button>
            </p>
          </Form>
        </Modal>
      )}

      {/* View new */}
      {!editing && (
        <Modal>
          <main className={classes.details}>
            <h3 className={classes.title}>{newItem.title}</h3>
            <p className={classes.content}>{newItem.content}</p>
          </main>
          <div className={classes.actions}>
            {userInformation?.role?.includes("Admin") && (
              <Link to="/" className={classes.btn}>
                <button onClick={deleteHandler}>Delete Notification</button>
              </Link>
            )}
            {userInformation?.role?.includes("Admin") && (
              <button
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit Notification
              </button>
            )}
            <Link to="/" className={classes.btn}>
              <button onClick={closeHandler}>Close</button>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewDetails;

export const loader = async ({ params }) => {
  const newItem = await getNew(params.id);
  return newItem;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  // const title = formData.get("title");
  // const content = formData.get("content");

  const id = params.id;

  const newData = Object.fromEntries(formData);

  try {
    await axios.patch(`${apiUrl}/news/edit/${id}`, {
      newTitle: newData.title,
      newContent: newData.content,
    });
  } catch (error) {
    console.log(Error);
  }

  return redirect("/");
};
