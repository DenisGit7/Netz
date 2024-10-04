import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './NewPost.module.css'
import { createPost } from '../helpers/posts/createPost'
import Modal from '../components/Modal'

const NewPost = () => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredContent, setEnteredContent] = useState('')

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value)
  }

  const contentChangeHandler = (event) => {
    setEnteredContent(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const postData = {
      title: enteredTitle,
      content: enteredContent
    }
    createPost(postData.title, postData.content)
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            required
            onChange={titleChangeHandler}
          />
        </p>

        <p>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            required
            rows={7}
            onChange={contentChangeHandler}
          />
        </p>

        <p className={classes.actions}>
          <Link to="/" type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  )
}

export default NewPost
