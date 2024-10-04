import { Link, Outlet } from 'react-router-dom'
import PostsList from '../features/post/PostsList'
import classes from './Posts.module.css'
import { FaEnvelope } from 'react-icons/fa6'

const Posts = () => {
  return (
    <>
      <Outlet />
      <main>
        <Link to="create-post" className={classes.element}>
          <FaEnvelope />
          <p className={classes.label}>Create Post</p>
        </Link>
        <PostsList />
      </main>
    </>
  )
}

export default Posts
