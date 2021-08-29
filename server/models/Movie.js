const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  isWatched: {
    type: Boolean,
    default: false
  },
  genre: {
    type: Array,
    required: true
  },
  directorId: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('Movie', movieSchema)