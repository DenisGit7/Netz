import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";
import Nav from "./Nav";
import Loader from "./Loader";
import Customers from "../features/user/Customers";
import ViewPosts from "../features/post/ViewPosts";
import ViewNews from "../features/new/ViewNews";
import CreateNew from "../features/new/CreateNew";
import FolderTree from "../features/file/FolderTree";
import FileUpload from "../features/file/FileUpload";
import CreateUser from "../features/user/CreateUser";
import CreatePost from "../features/post/CreatePost";

const Main = ({ user, role }) => {
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

  console.log(role);
  return (
    <>
      <Nav
        user={user}
        role={role}
        shUp={shUp}
        setShUp={setShUp}
        shNv={shNv}
        setShNv={setShNv}
        shPst={shPst}
        setShPst={setShPst}
        shNws={shNws}
        setShNws={setShNws}
        showCustomers={showCustomers}
        setShowCustomers={setShowCustomers}
        shCrtUsr={shCrtUsr}
        setShCrtUsr={setShCrtUsr}
        shCrPst={shCrtPst}
        setShCrtPst={setShCrtPst}
        shCrNws={shCrtNws}
        setShCrtNws={setShCrtNws}
      />

      <main className={classes.mainContainer}>
        <div className={classes.display}>
          {role === "Admin" && showCustomers && (
            <Customers role={role} setLoading={setLoading} />
          )}

          {role === "Admin" && shCrtUsr && (
            <CreateUser role={role} setLoading={setLoading} />
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
            />
          )}

          {/* {shPst && <ViewPosts setLoading={setLoading} />}
          {shNws && <ViewNews setLoading={setLoading} />} */}
          <div className={classes.ContentContainer}>
            <div className={classes.posts}>
              {role === "Admin" && shCrtPst && (
                <CreatePost role={role} setLoading={setLoading} />
              )}
              <ViewPosts
                setLoading={setLoading}
                loading={loading}
                role={role}
              />
            </div>

            <div className={classes.news}>
              {role === "Admin" && shCrtNws && (
                <CreateNew role={role} setLoading={setLoading} />
              )}
              <ViewNews setLoading={setLoading} loading={loading} role={role} />
            </div>
          </div>
        </div>
        <div className={classes.loader}>{loading && <Loader />}</div>
      </main>
    </>
  );
};

export default Main;
