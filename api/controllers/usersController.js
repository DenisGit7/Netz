import { User } from '../models/Users.js'

export const getAllUsers = async (req, res) => {
  const users = await User.find()
  if (!users) return res.status(204).json({ message: 'No users found' })
  res.json(users)
}

export const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'User ID required' })
  const user = await User.findOne({ _id: req.params.id }).exec()
  console.log(user)
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` })
  }
  res.json(user)
}

export const editUser = async (req, res) => {
  const id = req?.params?.id
  console.log(-5, 'e', id)
  const { newUsername } = req?.body
  console.log(-6, 'e', newUsername)
  if (!newUsername)
    return res.status(400).json({ message: 'All fields are required.' })
  try {
    const result = await User.findByIdAndUpdate(id, {
      username: newUsername
    })
    console.log(-7, 'e', result)

    res.status(201).json({ message: 'User updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const removeUser = async (req, res) => {
  console.dir(req?.params?.id)
  const { id } = req?.params?.id
  console.log('1', id)
  if (!id) return res.status(400).json({ message: 'User ID required' })

  const user = await User.findOne({ _id: id }).exec()
  console.log('2')

  if (!user) {
    console.log('3')

    return res.status(400).json({ message: `User ID ${id} not found` })
  }
  const result = await user.deleteOne({ _id: id })
  console.log('4')

  res.json(result)
}
