const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  title:  {
      type: String,
      required: true
  },
  price:  {
    type: Number,
    default: 0
  },
  description:  {
    type: String,
  },
  type:  {
    type: String,
  },
  isAvailable:  {
    type: Boolean,
    default: true
  },
  rating:  {
    type: Number,
    default: 1,
    min : 1,
    max : 5
  },
  releaseDate : {
      type: Date,
      default: Date.now()
  }
})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game