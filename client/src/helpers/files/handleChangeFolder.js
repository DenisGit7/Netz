export const handleChangeFolder = (e, folder, setFolderPath) => {
  e.preventDefault();
  const [customerFolder, subFolder] = folder.split("/");
  setFolderPath({
    customerFolder: customerFolder || "General",
    subFolder: subFolder || "",
  });
};
