import React from 'react'
import classes from './Header.module.css'

const Header = ({ title, user }) => {
  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      <p className={classes.welcome}>Welcome {user},</p>
      <p className={classes.welcome}>
        please choose one of the following actions:
      </p>
    </div>
  )
}

export default Header
