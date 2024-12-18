import React from "react";
import axios from "axios";
import { apiUrl } from "../service/api";
// import { useSession } from "../../context/SessionContext";
import classes from "../pages/Contact.module.css";
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

const ContactPage = () => {
  const [editing, setEditing] = useState(false);
  const { isLoggedIn, userInformation } = useSession();
  const contactData = useLoaderData();
  useEffect(() => {
    setEditing(false);
  }, [contactData]);
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
            <p className={classes.label}>Edit Contact</p>
          </button>
        </p>
      )}
      <h1 className={classes.contentTitle}>Contact</h1>

      {editing && (
        <Form method="post" className={classes.form}>
          <p>
            <label htmlFor="cellphone">Cellphone</label>
            <input
              defaultValue={contactData.cellphone}
              name="cellphone"
              type="text"
              id="cellphone"
            />
            <label htmlFor="phone">Phone</label>
            <input
              defaultValue={contactData.phone}
              name="phone"
              type="text"
              id="phone"
            />
            <label htmlFor="email">Email</label>
            <input
              defaultValue={contactData.email}
              name="email"
              type="text"
              id="email"
            />
            <label htmlFor="address">Address</label>
            <input
              defaultValue={contactData.address}
              name="address"
              type="text"
              id="address"
            />
            <label htmlFor="fax">Fax</label>
            <input
              defaultValue={contactData.fax}
              name="fax"
              type="text"
              id="fax"
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
            <button className={classes.btn}>Update Contact</button>
          </p>
        </Form>
      )}

      {!editing && (
        <div className={classes.contentContainer}>
          <h3 className={classes.content}>Phone: {contactData.cellphone}</h3>
          <h3 className={classes.content}>Office: {contactData.phone}</h3>
          <h3 className={classes.content}>Email: {contactData.email}</h3>
          <h3 className={classes.content}>Address: {contactData.address}</h3>
          <h3 className={classes.content}>Fax: {contactData.fax}</h3>
        </div>
      )}
    </div>
  );
};

export default ContactPage;

export const loader = async ({ params }) => {
  try {
    const response = await axios.get(`${apiUrl}/contact/get`);
    const contactData = response.data.contact;
    return contactData;
  } catch (error) {
    return error;
  }
  // return contact;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  // const title = formData.get("title");
  // const content = formData.get("content");

  const newData = Object.fromEntries(formData);
  try {
    await axios.patch(`${apiUrl}/contact/edit/`, {
      cellphone: newData.cellphone,
      phone: newData.phone,
      address: newData.address,
      email: newData.email,
      fax: newData.fax,
    });
  } catch (error) {
    console.log(Error);
  }

  return redirect("/contact");
};
