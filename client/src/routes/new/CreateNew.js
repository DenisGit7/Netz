import axios from "axios";
import { Link, Form, redirect } from "react-router-dom";
import classes from "./CreateNew.module.css";
import Modal from "../../components/Modal";

const CreateNew = () => {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="title">New Title</label>
          <input name="title" type="text" id="title" required />
        </p>

        <p>
          <label htmlFor="content">Content</label>

          <textarea
            name="content"
            id="content"
            required
            rows={7}
            className={classes.content}
          />
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            <button className={classes.actions}>Cancel</button>
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
};

export default CreateNew;

export const action = async ({ request }) => {
  const formData = await request.formData();

  // const title = formData.get('title')
  // console.log(1, title)
  // const content = formData.get('content')
  // console.log(2, content)

  const newData = Object.fromEntries(formData);

  try {
    await axios.post("http://localhost:3500/news/create", {
      title: newData.title,
      content: newData.content,
    });
  } catch (error) {
    console.log(Error);
  }

  return redirect("/");
};
