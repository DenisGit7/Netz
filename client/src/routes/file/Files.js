import axios from "axios";
import classes from "./Files.module.css";
import FileList from "../../features/file/FileList";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { handleChangeFolder } from "../../helpers/files/handleChangeFolder.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Link, Outlet, useLoaderData } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

const Files = () => {
  const { isLoggedIn, userInformation, folderPathProvider } = useSession();
  const role = userInformation.role;
  const rawData = useLoaderData();
  const [rawFiles, setRawFiles] = useState(rawData.files[0].files);
  const [rawFolders, setRawFolders] = useState(rawData.files[0].folders);

  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [folderPath, setFolderPath] = useState({
    customerFolder: sessionStorage.getItem("customerFolder"),
    subFolder: sessionStorage.getItem("subFolder"),
  });
  if (loading) {
    toast.loading("Loading...", { duration: 3000 });
    if (rawData) {
      setLoading(false);
      toast.dismiss();
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    setRawFiles(rawData.files[0].files);
    setRawFolders(rawData.files[0].folders);
    setSearchValue("");
    setLoading(true);
  }, [rawData]);

  useEffect(() => {
    const filteredFiles = rawData.files[0].files.filter((file) =>
      file.toLowerCase().includes(searchValue.toLowerCase())
    );
    const filteredFolders = rawData.files[0].folders.filter((folder) =>
      folder.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRawFolders(filteredFolders);
    setRawFiles(filteredFiles);
    if (!searchValue) {
      setRawFiles(rawData.files[0].files);
      setRawFolders(rawData.files[0].folders);
    }
  }, [searchValue]);

  const handleBack = (e) => {
    e.preventDefault();
    setLoading(true);

    handleChangeFolder(e, folderPath.customerFolder, folderPathHandler);

    setTimeout(() => {
      navigate("/dashboard/files");
    }, 200);
  };

  const handleBackAdmin = (e) => {
    e.preventDefault();
    setLoading(true);

    handleChangeFolder(e, "", folderPathHandler);
    setTimeout(() => {
      navigate("/dashboard/files");
    }, 200);
  };

  const folderPathHandler = (customerFolder, subFolder = "") => {
    setFolderPath({ customerFolder: customerFolder, subFolder: subFolder });
    sessionStorage.setItem("customerFolder", customerFolder);
    sessionStorage.setItem("subFolder", subFolder);
  };
  useEffect(() => {}, [folderPath]);
  useEffect(() => {
    // setFolderPath({
    //   customerFolder: sessionStorage.getItem("customerFolder"),
    //   subFolder: sessionStorage.getItem("subFolder"),
    // });
    const customerFolder = sessionStorage.getItem("customerFolder");
    const subFolder = sessionStorage.getItem("subFolder");
    folderPathHandler(customerFolder, subFolder);
  }, [
    sessionStorage.getItem("customerFolder"),
    sessionStorage.getItem("subFolder"),
  ]);
  useEffect(() => {
    // folderPathHandler(userInformation.username, "");
  }, [userInformation]);

  return (
    <>
      <Outlet />

      <div className={classes.container}>
        <h1 className={classes.contentTitle}>File Explorer</h1>

        {/* <p className={classes.text}>Your files get organised here by Month</p> */}
        <div className={classes.navigation}>
          <p className={classes.navText}>
            Current Folder :
            {folderPath.customerFolder ? (
              <span className={classes.span}> {folderPath.customerFolder}</span>
            ) : (
              <span className={classes.span}> {"Main"}</span>
            )}
            {folderPath.subFolder && (
              <span className={classes.span}> / {folderPath.subFolder}</span>
            )}
          </p>

          <Link to="/dashboard/files/upload" type="button">
            <button className={classes.uploadBtn}>Upload File</button>
          </Link>
          <input
            className={classes.search}
            type="search"
            id="search"
            placeholder="Search for..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(() => e.target.value);
            }}
          />
          {/* <div className={classes.arrowContainer}> */}
          <div className={classes.arrowContainer}>
            {folderPath.subFolder ? (
              <Link className={classes.arrowBtn} onClick={(e) => handleBack(e)}>
                <p>Back to {folderPath.customerFolder}</p>
              </Link>
            ) : (
              ""
            )}

            {role === "Admin" && folderPath.customerFolder != "" ? (
              <Link
                className={classes.arrowBtn}
                onClick={(e) => handleBackAdmin(e)}
              >
                <p>Back to Main</p>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>

        <FileList
          folderPathHandler={folderPathHandler}
          folderPath={folderPath}
          rawFiles={rawFiles}
          rawFolders={rawFolders}
        />
      </div>
    </>
  );
};

export default Files;

export const loader = async () => {
  const data = {
    customerFolder: sessionStorage.getItem("customerFolder"),
    subFolder: sessionStorage.getItem("subFolder"),
  };

  try {
    const response = await axios.post(
      "http://localhost:3500/files/getlist",
      data
    );
    return response.data.result;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
