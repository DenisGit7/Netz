import { Link, Outlet } from 'react-router-dom'
import classes from './Customers.module.css'
import CustomersList from '../../features/customers/CustomersList.js'
import { getAllUsers } from '../../helpers/usersHelper.js'
import { FaEnvelope } from 'react-icons/fa6'

const Customers = () => {
  // const [users, setUsers] = useState([]);
  // const [rawUsers, setRawUsers] = useState([]);
  // const [sourceUsers, setSourceUsers] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   const filteredUsers = rawUsers.filter((user) =>
  //     user.username.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setRawUsers(filteredUsers);
  //   if (!searchValue) {
  //     fetchData();
  //   }
  // }, [searchValue]);

  // useEffect(() => {
  //   if (rawUsers.length >= 0) {
  //     const rawUsersMap = rawUsers.map((rawUser, index) => {
  //       const id = rawUser._id;
  //       return (
  //         <div key={index}>
  //           <h2>{rawUser.username}</h2>

  //           <button
  //             className={classes.newButton}
  //             onClick={(e) => handleRemoveUser(e, id)}
  //           >
  //             Remove
  //           </button>
  //         </div>
  //       );
  //     });
  //     setUsers(rawUsersMap);
  //   }
  // }, [rawUsers]);

  // const fetchData = async () => {
  //   const promise = Promise.resolve(getAllUsers());
  //   promise.then((value) => {
  //     setRawUsers(value.data);
  //     setSourceUsers(value.data);
  //   });
  // };

  // const handleRemoveUser = async (e, id) => {
  //   e.preventDefault();

  //   try {
  //     const result = await removeUser(id);
  //     toast.success("User Removed");
  //   } catch (error) {
  //     toast.error(error);
  //   }
  //   fetchData();
  // };

  return (
    <>
      <>
        <Outlet />
        <main className={classes.customersContainer}>
          <Link to="create-user" className={classes.create}>
            <FaEnvelope />
            <p className={classes.label}>Create user</p>
          </Link>
          <CustomersList />
        </main>
      </>
      {/* <div className={classes.container}>
        <label className={classes.label} htmlFor="search">
          Search by id:
        </label>
        <input
          className={classes.label}
          type="search"
          id="search"
          placeholder="User id..."
          value={searchValue}
          // onChange={(e) => setSearchValue(() => e.target.value)}
          onChange={(e) => {
            setSearchValue(() => e.target.value);
            setRawUsers(sourceUsers);
          }}
        />
      </div>
      <div className={classes.container}>{users}</div> */}
    </>
  )
}

export default Customers

export const loader = async () => {
  const response = await getAllUsers()
  return response
}
