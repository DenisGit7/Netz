import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";
import Loader from "./Loader";
import Customers from "../features/user/Customers";
import PostsList from "../features/post/PostsList";
import ViewNews from "../features/new/ViewNews";
import CreateNew from "../features/new/CreateNew";
import FolderTree from "../features/file/FolderTree";
import FileUpload from "../features/file/FileUpload";
import CreateUser from "../features/user/CreateUser";

const Main = ({ user, role, setUser, setRole }) => {
  //Active display
  const [tab, setTab] = useState("Default");
  const [modalVisible, setModalVisible] = useState(false);

  //file nav and upload states
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploadPath, setUploadPath] = useState({
    customerFolder: "",
    subFolder: "",
  });
  const [folderPath, setFolderPath] = useState({
    customerFolder: "",
    subFolder: "",
  });

  //admin controls
  const [showCustomers, setShowCustomers] = useState(false);
  const [shCrtUsr, setShCrtUsr] = useState(false);
  const [shCrtPst, setShCrtPst] = useState(false);
  const [shCrtNws, setShCrtNws] = useState(false);

  //user displays
  const [shUp, setShUp] = useState(false);
  const [shNv, setShNv] = useState(false);
  const [shPst, setShPst] = useState(false);
  const [shNws, setShNws] = useState(false);

  useEffect(() => {
    setUploadPath({ customerFolder: user, subFolder: "Month" });
    setFolderPath({ customerFolder: user, subFolder: "" });
  }, [user]);

  useEffect(() => {
    setShUp(false);
    setShNv(false);
  }, [user]);
  useEffect(() => {
    if (role === "") {
      setShCrtUsr(false);
      setShCrtPst(false);
      setShCrtNws(false);
      setShowCustomers(false);
    }
  }, [role]);

  const hideModalHandler = () => {
    setModalVisible(false);
  };

  const showModalHandler = () => {
    setModalVisible(true);
  };

  return (
    <>
      <main className={classes.mainContainer}>
        <div className={classes.display}>
          {role.includes("Admin") && showCustomers && (
            <div className={classes.usersContainer}>
              <Customers
                role={role}
                setLoading={setLoading}
                setShCrtPst={setShCrtPst}
                setShCrtNws={setShCrtNws}
                setShCrtUsr={setShCrtUsr}
                setShUp={setShUp}
                setShNv={setShNv}
              />
            </div>
          )}

          {role.includes("Admin") && shCrtUsr && (
            <CreateUser
              role={role}
              setLoading={setLoading}
              setShCrtUsr={setShCrtUsr}
              setShowCustomers={setShowCustomers}
              setShCrtPst={setShCrtPst}
              setShCrtNws={setShCrtNws}
              setShUp={setShUp}
              setShNv={setShNv}
            />
          )}

          {shUp && (
            <FileUpload
              setLoading={setLoading}
              file={file}
              setFile={setFile}
              uploadPath={uploadPath}
              setFiles={setFiles}
              setFolders={setFolders}
              folderPath={folderPath}
              setShCrtPst={setShCrtPst}
              setShCrtNws={setShCrtNws}
              setShCrtUsr={setShCrtUsr}
              setShowCustomers={setShowCustomers}
            />
          )}

          {shNv && (
            <FolderTree
              setLoading={setLoading}
              role={role}
              files={files}
              setFiles={setFiles}
              folders={folders}
              setFolders={setFolders}
              folderPath={folderPath}
              setFolderPath={setFolderPath}
              setShCrtPst={setShCrtPst}
              setShCrtNws={setShCrtNws}
              setShCrtUsr={setShCrtUsr}
              setShowCustomers={setShowCustomers}
            />
          )}
          {tab === "Default" && (
            <div className={classes.ContentContainer}>
              <div className={classes.posts}>
                <PostsList
                  onStopPosting={hideModalHandler}
                  isPosting={modalVisible}
                  setLoading={setLoading}
                  role={role}
                />
              </div>

              <div className={classes.news}>
                {role.includes("Admin") && shCrtNws && (
                  <CreateNew
                    role={role}
                    setLoading={setLoading}
                    setShCrtNws={setShCrtNws}
                    setShUp={setShUp}
                    setShNv={setShNv}
                    setShCrtUsr={setShCrtUsr}
                    setShowCustomers={setShowCustomers}
                  />
                )}
                <ViewNews
                  setLoading={setLoading}
                  loading={loading}
                  role={role}
                />
              </div>
            </div>
          )}
        </div>
        <div className={classes.loader}>{loading && <Loader />}</div>
      </main>
    </>
  );
};

export default Main;
