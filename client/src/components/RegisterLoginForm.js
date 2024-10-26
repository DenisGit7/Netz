import React, { useState } from 'react'
import { registerUser } from '../service/authApi'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'

const RegisterLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const RegisterHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await registerUser(username, password)
      console.log(data)
      toast.success('User registered successfuly')
      setUsername('')
      setPassword('')
    } catch (error) {
      toast.error(error)
      setUsername('')
      setPassword('')
    }
  }
  return (
    <form onSubmit={RegisterHandler}>
      <div>
        <label>Username</label>
        <input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a username"
          required
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          label="Username"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        ></input>
      </div>

      <button type="submit">Register a new user</button>
    </form>
  )
}

export default RegisterLoginForm
