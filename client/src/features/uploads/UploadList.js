import { useLoaderData } from "react-router-dom";
import classes from "./UploadList.module.css";
import Upload from "./Upload.js";
import { useEffect, useState } from "react";

const UploadsList = () => {
  const data = useLoaderData();
  const uploads = data.uploads;

  return (
    <>
      {uploads.length > 0 && (
        <>
          <h1 className={classes.contentTitle}>Last Uploads</h1>
          <ul className={classes.posts}>
            {uploads.map((upload) => (
              <Upload
                key={upload._id}
                id={upload._id}
                username={upload.username}
                fullpath={upload.fullpath}
                createdAt={upload.uploaded}
              />
            ))}
          </ul>
        </>
      )}

      {uploads.length === 0 && (
        <p className={classes.text}>There are no uploads yet</p>
      )}
    </>
  );
};

export default UploadsList;
