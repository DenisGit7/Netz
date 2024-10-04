import { Outlet } from 'react-router-dom'
import classes from './dummy.module.css'

const dummy = () => {
  return (
    <>
      <Outlet />
      <main></main>
    </>
  )
}

export default dummy
