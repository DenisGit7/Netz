import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";
import Header from "../components/header/Header.js";
import { useSession } from "../context/SessionContext.js";

const RootLayout = () => {
  const navigate = useNavigate();
  const { login, logout } = useSession();

  const LoginHandler = (userData) => {
    console.log("***Login**through**session**inRootLayout***", userData);
    //Passes data to SessionContext
    login(userData);

    if (userData.role.includes("Admin")) {
      //TODO:/dashboard/admin ?
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const LogoutHandler = (data) => {
    console.log("***Logout**through**session**inRootLayout***", data);
    //Passes data to SessionContext
    logout(data);

    if (data) {
      navigate("/");
    }
  };
  // const [user, setUser] = useState("");
  // const [role, setRole] = useState("");

  // const roleChangeHandler = (role) => setRole(role);
  // const adminChangeHandler = (user) => setUser(user);
  // const [user, setUser] = useState(localStorage.getItem('user') || '')
  // const [role, setRole] = useState(localStorage.getItem('role') || '')

  // const roleChangeHandler = (role) => {
  //   setRole(role)
  //   localStorage.setItem('role', role)
  // }

  // const adminChangeHandler = (user) => {
  //   setUser(user)
  //   localStorage.setItem('user', user)
  // }
  // useEffect(() => {
  //   if (!role) {
  //     navigate('/')
  //   }
  // }, [])

  return (
    <>
      <Toaster />
      <Header
        onLogin={LoginHandler}
        onLogout={LogoutHandler}
        // user={user}
        // setRole={roleChangeHandler}
        // setUser={adminChangeHandler}
        // role={role}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
// export const loader = async () => {
//   const user = localStorage.getItem('user')
//   const role = localStorage.getItem('role')

//   return { user, role }
// }
