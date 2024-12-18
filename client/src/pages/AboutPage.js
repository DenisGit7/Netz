import React from "react";
import axios from "axios";
import { apiUrl } from "../service/api";
// import { useSession } from "../../context/SessionContext";
import classes from "../pages/About.module.css";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  Link,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import { useSession } from "../context/SessionContext";
import Modal from "../components/Modal";
import { FaEnvelope } from "react-icons/fa6";

const AboutPage = () => {
  const [editing, setEditing] = useState(false);
  const { isLoggedIn, userInformation } = useSession();
  const aboutData = useLoaderData();
  useEffect(() => {
    setEditing(false);
  }, [aboutData]);
  return (
    <div className={classes.mainContainer}>
      {userInformation?.role?.includes("Admin") && !editing && (
        <p className={classes.actions}>
          {" "}
          <button
            onClick={() => {
              setEditing(true);
            }}
            className={classes.btn}
          >
            <p className={classes.label}>Edit About</p>
          </button>
        </p>
      )}
      <h1 className={classes.contentTitle}>About</h1>

      {editing && (
        <Form method="post" className={classes.form}>
          <p>
            <label htmlFor="content1">Content1</label>
            <textarea
              defaultValue={aboutData.content1}
              name="content1"
              type="text"
              id="content1"
            />
            <label htmlFor="content2">Content2</label>
            <textarea
              defaultValue={aboutData.content2}
              name="content2"
              type="text"
              id="content2"
            />
          </p>
          <p className={classes.actions}>
            {" "}
            <button
              className={classes.btn}
              type="button"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </button>
            <button className={classes.btn}>Update About</button>
          </p>
        </Form>
      )}

      {!editing && (
        <>
          {" "}
          <div className={classes.contentContainer1}>
            <p className={classes.content1}>{aboutData.content1}</p>
            <p className={classes.content2}>{aboutData.content2}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutPage;

export const loader = async ({ params }) => {
  try {
    const response = await axios.get(`${apiUrl}/about/get`);
    const aboutData = response.data.about;
    return aboutData;
  } catch (error) {
    return error;
  }
  // return about;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  // const title = formData.get("title");
  // const content = formData.get("content");

  const newData = Object.fromEntries(formData);
  try {
    await axios.patch(`${apiUrl}/about/edit/`, {
      content1: newData.content1,
      content2: newData.content2,
    });
  } catch (error) {
    console.log(Error);
  }

  return redirect("/about");
};
