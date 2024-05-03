const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title: {
    type: String
    // ,
    // minLength: 3,
    // required: true,
    // unique:true
  },
  author:{
    type: String
  },
  url:{
    type: String
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// personSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})
module.exports = mongoose.model('Blog', blogSchema)