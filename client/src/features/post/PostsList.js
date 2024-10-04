import React from 'react'
import { useState, useEffect } from 'react'
//import toast from 'react-hot-toast'
import classes from './PostsList.module.css'
import Loader from '../../components/Loader.js'

import { getPosts } from '../../helpers/posts/getPosts.js'
import Post from './Post.js'

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  // const addPostHandler = (postData) => {
  //   setPosts((existingPosts) => [postData, ...existingPosts])
  // }

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true)
      const response = await getPosts()
      setPosts(response)
      setIsFetching(false)
    }
    fetch()
  }, [])

  return (
    <>
      {/* if not fetching and we have posts */}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          <h1>Posts</h1>
          {posts.map((post, i) => (
            <Post key={i} title={post.title} content={post.content} />
          ))}
        </ul>
      )}

      {/* if not fetching and no posts */}
      {!isFetching && posts.length === 0 && (
        <p className={classes.post}>There are no posts yet</p>
      )}

      {isFetching && <Loader />}
    </>
  )
}

export default PostsList

/* create post opens over everything else {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}*/
