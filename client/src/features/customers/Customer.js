import { Link } from 'react-router-dom'
import classes from './Customer.module.css'

const Customer = ({ id, username }) => {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <p className={classes.title}>{username}</p>
      </Link>
    </li>
  )
}

export default Customer
