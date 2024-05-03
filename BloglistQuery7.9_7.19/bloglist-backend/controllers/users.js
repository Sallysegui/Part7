const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user_model')


usersRouter.get('/', async (request, response) => {

  const persons =  await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(persons)
})

// // const idNum = Math.floor(Math.random() * 4556432)

usersRouter.get('/:id', async (request, response) => {

  const person = await User.findById(request.params.id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

////////////////////////////////////////check about next
usersRouter.post('/', async (request, response) => {
// personsRouter.post('/', (request, response, next) => {
  console.log('body')
  // console.log(request)
  const body = request.body
  console.log(body)
  //console.log(body.password)
  //if (body === undefined||!body.name||!body.number) {
  if (body === undefined||!body.name||!body.password) {
    return response.status(400).json({ error: 'content missing' })
  }
  console.log ('before person found')
  const userFound = await User.find({ 'name':body.name })
  console.log ('after')
  if(userFound[0]){
    console.log (userFound)
    return response.status(400).json({ error: 'this person already exists' })
  }
  console.log ('no person')
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log(passwordHash)

  const user = new User({
    name:body.name,
    passwordHash:passwordHash
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})



usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id)
  if (user) {
    response.status(204).end()
  } else {
    response.status(400).end()
  }
})


usersRouter.put('/:id', async (request, response) => {
  const { name, number } = request.body
  const user = await User.findByIdAndUpdate(request.params.id, { name, number },
    { new: true, runValidators: true, context: 'query'  }
  )
  if (user) {
    response.json(user)
  } else {
    response.status(400).end()
  }
})


module.exports = usersRouter