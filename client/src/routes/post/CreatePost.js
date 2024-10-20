import axios from 'axios'
import { Link, Form, redirect } from 'react-router-dom'
import classes from './CreatePost.module.css'
import Modal from '../../components/Modal'

const CreatePost = () => {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="title">Post Title</label>
          <input name="title" type="text" id="title" required />
        </p>

        <p>
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" required rows={7} />
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  )
}

export default CreatePost

export const action = async ({ request }) => {
  const formData = await request.formData()

  // const title = formData.get('title')
  // console.log(1, title)
  // const content = formData.get('content')
  // console.log(2, content)

  const postData = Object.fromEntries(formData)

  try {
    // Taken out of helper createPost, making that file useless.
    //This is necessary for loader to update display after posting. obselete file path:
    //C:\Archive\Programing\accounting\client\src\helpers\posts\createPost.js

    await axios.post('http://localhost:3500/posts/create', {
      title: postData.title,
      content: postData.content
    })
  } catch (error) {
    console.log(Error)
  }

  return redirect('/')
}
