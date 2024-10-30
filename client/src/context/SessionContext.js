import { createContext, useContext, useEffect, useState } from "react";
// import { FolderProvider } from "./FolderContext";
const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

//this gets session values
export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [folderPathProvider, setFolderPath] = useState({
  //   customerFolder: "TEST",
  //   subFolder: "",
  // });
  // const updateFolderPath = (customerFolder, subFolder = "") => {
  //   setFolderPath({ customerFolder, subFolder });
  // };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("userData"));
    if (storedUser) {
      setUserInformation(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUserInformation(userData);
    sessionStorage.setItem("userData", JSON.stringify(userData));

    sessionStorage.setItem("subFolder", "");

    if (userData.role.includes("Admin")) {
      sessionStorage.setItem("customerFolder", "");
    } else {
      sessionStorage.setItem("customerFolder", userData.username);
    }
  };

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUserInformation(null);
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("customerFolder");
      sessionStorage.removeItem("subFolder");
    }
  };

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        userInformation,
        login,
        logout,
        loading,
        // folderPathProvider,
        // updateFolderPath,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
