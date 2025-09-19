const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InterviewSchema = new Schema({
  candidateName: String,
  startTime: Date,
  endTime: Date,
  durationSec: Number,
  videoPath: String,
  logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }],
  integrityScore: Number
}) 

module.exports = mongoose.model('Interview', InterviewSchema)
