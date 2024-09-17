// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa6";
// import { FaArrowLeft } from "react-icons/fa6";

// const FileList = () => {
//   const [folderPath, setFolderPath] = useState({
//     customerFolder: "General",
//     subFolder: "Oct",
//   });
//   const [folders, setFolder] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [file, setFile] = useState([]);

//   useEffect(() => {
//     getList();
//   }, []);
//   useEffect(() => {
//     getList();
//   }, [folderPath]);

//   const handleRemove = async (filepath) => {
//     const data = {
//       fileName: filepath,
//     };
//     try {
//       const response = await axios.post(
//         "http://localhost:3500/files/remove",
//         data
//       );
//       console.log("File removed: ", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//     setTimeout(() => {
//       getList();
//     }, 1000);
//   };

//   const getList = async () => {
//     console.log("getting list");
//     const data = {
//       customerFolder: folderPath.customerFolder,
//       subFolder: folderPath.subFolder,
//     };
//     try {
//       const response = await axios.post(
//         "http://localhost:3500/files/getlist",
//         data
//       );
//       const foldersMap = response.data.result.folders.map((folder) => {
//         return (
//           <h2>
//             {folder}
//             <FaArrowLeft onClick={(e) => handleChangeFolder(e, folder)} />
//           </h2>
//         );
//       });
//       const filesMap = response.data.result.files.map((file) => {
//         return (
//           <>
//             <h2>{file}</h2>
//             <FaTrash onClick={() => handleRemove(file)} />
//           </>
//         );
//       });
//       setFiles(filesMap);
//       setFolder(foldersMap);
//       console.log(files);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   const handleChangeFolder = (e, folder) => {
//     e.preventDefault();
//     const [customerFolder, subFolder] = folder.split("/");
//     setFolderPath({
//       customerFolder: customerFolder || "General",
//       subFolder: subFolder || "",
//     });
//   };
//   const handleChangeBack = (e) => {
//     e.preventDefault();
//     setFolderPath({
//       customerFolder: folderPath.customerFolder || "General",
//       subFolder: "",
//     });
//   };

//   const handleChangeAdminBack = (e) => {
//     e.preventDefault();
//     setFolderPath({
//       customerFolder: "",
//       subFolder: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("customerFolder", folderPath.customerFolder);
//     formData.append("subFolder", folderPath.subFolder);
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         "http://localhost:3500/files/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//     setTimeout(() => {
//       getList();
//     }, 1000);
//   };

//   return (
//     <div>
//       FileList
//       <h1>Files:</h1>
//       {files}
//       <h1>Folders:</h1>
//       {folders}
//       Upload
//       <form onSubmit={handleSubmit}>
//         <div>
//           <br />
//           <input
//             type="file"
//             id="file"
//             onChange={(e) => setFile((prev) => e.target.files[0])}
//           />
//         </div>
//         <button type="submit">Upload</button>
//       </form>
//       <div>
//         Back
//         <FaArrowLeft onClick={(e) => handleChangeBack(e)} />
//       </div>
//       <div>
//         Admin Back
//         <FaArrowLeft onClick={(e) => handleChangeAdminBack(e)} />
//       </div>
//     </div>
//   );
// };

// export default FileList;
