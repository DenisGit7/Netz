import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";
import Header from "../components/header/Header.js";
import { useSession } from "../context/SessionContext.js";
import classes from "./RootLyaout.module.css";

const RootLayout = () => {
  const navigate = useNavigate();
  const { login, logout } = useSession();

  const LoginHandler = (userData) => {
    login(userData);
    if (userData.role.includes("Admin")) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const LogoutHandler = (data) => {
    logout(data);
    if (data) {
      navigate("/");
    }
  };

  return (
    <>
      <Toaster />
      <Header onLogin={LoginHandler} onLogout={LogoutHandler} />

      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
