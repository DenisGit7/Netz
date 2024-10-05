import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";
import Header from "../components/header/Header.js";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const roleChangeHandler = (role) => setRole(role);
  const adminChangeHandler = (user) => setUser(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, []);
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
