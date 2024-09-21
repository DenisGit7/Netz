import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Nav from '../components/Nav.js'

// TODO: if state has no use here, it can be passed down from App with useContext() to any descendant instead of props w/ useState()

const Layout = ({ showUpload, setShowUpload, showFolders, setShowFolders }) => {
  return (
    <div>
      <Header title="Netz App" user="testUser" />
      <Nav
        showUpload={showUpload}
        setShowUpload={setShowUpload}
        showFolders={showFolders}
        setShowFolders={setShowFolders}
      />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
