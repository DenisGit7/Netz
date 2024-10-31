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
import Modal from "../../components/Modal";
import classes from "./PostDetails.module.css";
import { getPost } from "../../helpers/posts/getPosts";
import { deletePost } from "../../helpers/posts/deletePost";
import { useSession } from "../../context/SessionContext";

const PostDetails = () => {
  const { isLoggedIn, userInformation } = useSession();
  const [editing, setEditing] = useState(false);
  const post = useLoaderData();
  const navigate = useNavigate();

  const { title, content } = post;
  const id = post._id;

  const deleteHandler = async () => {
    try {
      const result = await deletePost(id);

      if (result.status === 201) {
        toast.success("Post deleted");
      }
    } catch (error) {
      toast.error(error);
    }
    navigate("/dashboard");
  };
  const closeHandler = async () => {
    navigate("/dashboard");
  };

  if (!post) {
    return (
      // Post not found display

      <Modal className={classes.center}>
        <main className={classes.details}>
          <h2 className={classes.content}>Could not find post</h2>
          <p className={classes.content}>
            Unfortunately, the requested post could not be found.
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
      {/* Edit post */}
      {editing && (
        <Modal>
          <Form method="post" className={classes.form}>
            <p>
              <label htmlFor="title">Post Title</label>
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
              <button>Update Post</button>
            </p>
          </Form>
        </Modal>
      )}

      {/* View post */}
      {!editing && (
        <Modal>
          <main className={classes.details}>
            <h3 className={classes.title}>{post.title}</h3>
            <p className={classes.content}>{post.content}</p>
          </main>
          <div className={classes.actions}>
            {userInformation?.role?.includes("Admin") && (
              <Link to="/" className={classes.btn}>
                <button onClick={deleteHandler}>Delete Post</button>
              </Link>
            )}
            {userInformation?.role?.includes("Admin") && (
              <button
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit Post
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

export default PostDetails;

export const loader = async ({ params }) => {
  const post = await getPost(params.id);
  return post;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  // const title = formData.get("title");
  // const content = formData.get("content");

  const id = params.id;

  const postData = Object.fromEntries(formData);

  try {
    await axios.patch(`http://localhost:3500/posts/edit/${id}`, {
      newTitle: postData.title,
      newContent: postData.content,
    });
  } catch (error) {
    console.log(Error);
  }

  return redirect("/");
};
