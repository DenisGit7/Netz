export const handleChangeFolder = (e, folder) => {
  e.preventDefault();
  const [customerFolder, subFolder] = folder.split("/");
  // setFolderPath({
  //   customerFolder: customerFolder || "General",
  //   subFolder: subFolder || "",
  // });
  console.log(customerFolder, subFolder);
};
