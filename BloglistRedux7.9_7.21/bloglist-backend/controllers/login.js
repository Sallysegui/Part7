const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user_model')



loginRouter.post('/', async (request, response) => {
  // console.log('inside login')
  // console.log(request.body)
  const { username, password } = request.body
  // console.log(username)
  const user = await User.findOne({ name:username })
  // console.log(user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  // console.log(passwordCorrect)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // console.log(process.env.SECRET)
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )
  // console.log(process.env.SECRET)
  // console.log(token)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter