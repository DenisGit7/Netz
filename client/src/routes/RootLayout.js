import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.js";
import Header from "../components/header/Header.js";
import { useState } from "react";

const RootLayout = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const roleChangeHandler = (role) => setRole(role);
  const adminChangeHandler = (user) => setUser(user);
  return (
    <>
      <Toaster />
      <Header
        user={user}
        setRole={roleChangeHandler}
        setUser={adminChangeHandler}
        role={role}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
