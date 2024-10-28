import { createContext, useContext, useState } from "react";

const FolderContext = createContext();

export const useFolderContext = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [folderPathProvider, setFolderPath] = useState({
    customerFolder: "TEST",
    subFolder: "",
  });

  const updateFolderPath = (customerFolder, subFolder = "") => {
    setFolderPath({ customerFolder, subFolder });
  };

  return (
    <FolderContext.Provider value={{ folderPathProvider, updateFolderPath }}>
      {children}
    </FolderContext.Provider>
  );
};
