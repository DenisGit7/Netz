// import axios from "axios";
// import { FaTrash } from "react-icons/fa6";

// export default getList = async (customerFolder, subFolder,) => {
//   console.log("getting list");
//   const data = {
//     customerFolder: customerFolder,
//     subFolder: subFolder,
//   };
//   try {
//     const response = await axios.post(
//       "http://localhost:3500/files/getlist",
//       data
//     );

//     // console.log(
//     //   "List of folders and files from backend: ",
//     //   response.data.result.files,
//     //   response.data.result.folders
//     // );
//     // setRawFiles(response.data.result.files);
//     // setRawFolder(response.data.result.folders);
//     const foldersMap = response.data.result.folders.map((folder) => {
//       return <h2>{folder}</h2>;
//     });
//     const filesMap = response.data.result.files.map((file) => {
//       return (
//         <>
//           <h2>{file}</h2>
//           <FaTrash onClick={() => handleRemove(file)} />
//         </>
//       );
//     });
//     // setFiles(filesMap);
//     // setFolder(foldersMap);
//     // console.log(files);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//   }
//   return foldersMap
// };
