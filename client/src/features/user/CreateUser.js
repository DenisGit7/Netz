// import React from "react";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import classes from "./CreateUser.module.css";
// import { createUser } from "../../helpers/auth/createUser";

// const CreateUser = ({
//   role,
//   setLoading,
//   setShCrtUsr,
//   setShowCustomers,
//   setShCrtNws,
//   setShCrtPst,
//   setShUp,
//   setShNv,
// }) => {
//   const [newUser, setNewUser] = useState("");
//   const [newPwd, setNewPwd] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [buisnessId, setBuisnessId] = useState("");
//   const [sector, setSector] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [desctription, setDescription] = useState("");
//   const [newRole, setNewRole] = useState("Customer");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     setShowCustomers(false);
//     setShCrtNws(false);
//     setShCrtPst(false);
//     setShUp(false);
//     setShNv(false);
//     console.log("sdsdsdsdd");
//   }, []);

//   const resetState = () => {};

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!newUser || !newPwd || !newRole) {
//       setMessage("All fields are reuired");
//     } else {
//       try {
//         const result = await createUser(
//           newUser,
//           newPwd,
//           newRole,
//           firstName,
//           lastName,
//           buisnessId,
//           sector,
//           email,
//           phone,
//           desctription
//         );
//         if (result.status === 409) {
//           // User already exist
//           setMessage(result.response.data.message);
//           toast.error("User already exists");
//         } else if (result.status === 201) {
//           // User created
//           setMessage(result.data.message);
//           toast.success("User created");
//           setNewPwd("");
//           setNewUser("");
//           setFirstName("");
//           setLastName("");
//           setBuisnessId("");
//           setSector("");
//           setEmail("");
//           setPhone("");
//           setDescription("");
//           setNewRole("Customer");
//         } else {
//           setNewPwd("");
//           setNewUser("");
//           setFirstName("");
//           setLastName("");
//           setBuisnessId("");
//           setSector("");
//           setEmail("");
//           setPhone("");
//           setDescription("");
//           setNewRole("Customer");

//           setMessage("Error");
//         }
//       } catch (error) {
//         toast.error(error);
//       }
//       setLoading(false);
//     }
//   };
//   return (
//     <div className={classes.container}>
//       <button onClick={() => setShCrtUsr(false)}>Close</button>
//       asfafasfafs
//       <form className={classes.formContainer} onSubmit={(e) => handleCreate(e)}>
//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Username"
//           value={newUser}
//           onChange={(e) => setNewUser(() => e.target.value)}
//         />
//         <input
//           type="password"
//           required
//           className={classes.input}
//           placeholder="Password"
//           value={newPwd}
//           onChange={(e) => setNewPwd(() => e.target.value)}
//         />
//         {/* <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(() => e.target.value)}
//         />

//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(() => e.target.value)}
//         />
//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Buisness ID"
//           value={buisnessId}
//           onChange={(e) => setBuisnessId(() => e.target.value)}
//         />
//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Buisness Sector"
//           value={sector}
//           onChange={(e) => setSector(() => e.target.value)}
//         />
//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(() => e.target.value)}
//         />
//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(() => e.target.value)}
//         />
//         <input
//           type="text"
//           required
//           className={classes.input}
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(() => e.target.value)}
//         /> */}
//         <select
//           type="text"
//           className={classes.input}
//           value={newRole}
//           onChange={(e) => setNewRole(() => e.target.value)}
//         >
//           <option value="Admin">Admin</option>
//           <option value="Customer">Customer</option>
//         </select>
//         <button
//           // disabled={role === "Admin"}
//           type="submit"
//           className={classes.newButton}
//         >
//           Create
//         </button>
//         <label>{message}</label>
//       </form>
//     </div>
//   );
// };

// export default CreateUser;
