const { Schema, model } = require('mongoose')

const directorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('Director', directorSchema)