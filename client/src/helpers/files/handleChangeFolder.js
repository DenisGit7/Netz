import { loader } from "../../routes/file/Files";

export const handleChangeFolder = (e, folder, folderPathHandler) => {
  e.preventDefault();
  console.log(folder);
  const [customerFolder, subFolder] = folder.split("/");

  folderPathHandler(customerFolder, subFolder);
  console.log(customerFolder, subFolder);
};
