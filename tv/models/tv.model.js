const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tvSchema = new Schema ({
  name: String,
  overview: String,
  popularity: Number,
  tag: []
})

const Tvseries = mongoose.model('Tvseries', tvSchema)

module.exports = Tvseries
