import { createContext, useContext, useState } from 'react'

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

//this gets session values
export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInformation, setUserInformation] = useState(null)

  const login = (userData) => {
    setIsLoggedIn(true)
    setUserInformation(userData)
  }

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false)
      setUserInformation(null)
    }
  }

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, userInformation, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  )
}
