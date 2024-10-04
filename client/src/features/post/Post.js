import classes from './Post.module.css'

const Post = ({ title, content }) => {
  return (
    <li className={classes.post}>
      <p className={classes.title}>{title}</p>
      <p className={classes.content}>{content}</p>
    </li>
  )
}

export default Post
