// require("dotenv").config();
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'
import uploadRoute from './src/routes/files/uploadRoute.js'
import getListRoute from './src/routes/files/getListRoute.js'
import removeRoute from './src/routes/files/removeRoute.js'
import downloadRoute from './src/routes/files/downloadRoute.js'
import registerRoute from './src/routes/auth/registerRoute.js'
import loginRoute from './src/routes/auth/loginRoute.js'
import logoutRoute from './src/routes/auth/logoutRoute.js'
import refreshRoute from './src/routes/refreshRoute.js'
import usersRoute from './src/routes/usersRoute.js'
import createPost from './src/routes/posts/createPost.js'
import deletePost from './src/routes/posts/deletePost.js'
import editPost from './src/routes/posts/editPost.js'
import getPosts from './src/routes/posts/getPosts.js'
import createNew from './src/routes/news/createNew.js'
import deleteNew from './src/routes/news/deleteNew.js'
import editNew from './src/routes/news/editNew.js'
import getNews from './src/routes/news/getNews.js'
import connectDB from './src/db/connect.js'

//TODO:NEW
import authRoutes from './src/routes/auth/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3500

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions))
app.use(json({ limit: '100mb' }))
app.use(urlencoded({ limit: '100mb', extended: true }))
//TODO:NEW
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60000 * 60
    }
  })
)
//TODO:NEW
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Account Manager App')
})

//TODO:NEW
app.use('/api/auth', authRoutes)

app.use('/users/login', loginRoute)
app.use('/users/refresh', refreshRoute)

// app.use(jwtVerification);
app.use('/users/logout', logoutRoute)
app.use('/users/register', registerRoute)
app.use('/files/upload', uploadRoute)
app.use('/files/getlist', getListRoute)
app.use('/files/remove', removeRoute)
app.use('/files/download', downloadRoute)

app.use('/customers', usersRoute)
app.use('/posts/create', createPost)
app.use('/posts/delete', deletePost)
app.use('/posts/edit', editPost)
app.use('/posts/get', getPosts)
app.use('/news/create', createNew)
app.use('/news/delete', deleteNew)
app.use('/news/edit', editNew)
app.use('/news/get', getNews)

async function start() {
  console.log('connecting...')

  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
