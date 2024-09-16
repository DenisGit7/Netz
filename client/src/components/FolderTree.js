import FileList from "../features/FileList";
import Remove from "../features/Remove";
import Upload from "../features/Upload";

import React from "react";

const FolderTree = () => {
  return (
    <div>
      FolderTree
      <FileList></FileList>
      <Remove></Remove>
      <Upload></Upload>
    </div>
  );
};

export default FolderTree;
