// helpers/reportHelper.js
const Interview = require('../models/Interview')
const Log = require('../models/Log')

async function computeReport(interviewId) {
  const interview = await Interview.findById(interviewId).populate('logs')
  if (!interview) throw new Error('Interview not found')
  const logs = interview.logs || []

  // derive stats
  let focusLostCount = logs.filter(l => l.type === 'looking_away').length
  let noFaceCount = logs.filter(l => l.type === 'no_face').length
  let multipleFaces = logs.filter(l => l.type === 'multiple_faces').length
  let phoneEvents = logs.filter(l => l.type === 'object_detected' && l.detail?.object === 'phone').length
  let notesEvents = logs.filter(l => l.type === 'object_detected' && l.detail?.object === 'book_or_notes').length
  let extraDeviceEvents = logs.filter(l => l.type === 'object_detected' && l.detail?.object === 'extra_device').length

  // simple scoring: start 100, subtract weighted penalties
  let score = 100
  score -= focusLostCount * 3
  score -= noFaceCount * 5
  score -= multipleFaces * 10
  score -= phoneEvents * 15
  score -= notesEvents * 10
  score -= extraDeviceEvents * 7
  if (score < 0) score = 0

  return {
    candidateName: interview.candidateName,
    interviewId: interview._id,
    logsCount: logs.length,
    focusLostCount,
    noFaceCount,
    multipleFaces,
    phoneEvents,
    notesEvents,
    extraDeviceEvents,
    integrityScore: score
  }
}

module.exports = { computeReport }
