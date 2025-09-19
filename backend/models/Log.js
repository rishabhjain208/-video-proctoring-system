const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
  time: { type: Date, default: Date.now },
  type: String,
  detail: Schema.Types.Mixed,
  interviewId: { type: Schema.Types.ObjectId, ref: 'Interview' }
})

module.exports = mongoose.model('Log', LogSchema)
