// routes/interviewRoutes.js
const express = require('express')
const router = express.Router()
const interviewController = require('../controllers/interviewController')

// Upload interview with logs
router.post(
  '/',
  interviewController.uploadMiddleware,
  interviewController.uploadInterview
)

// Fetch report by interview ID
router.get('/report/:id', interviewController.getReport)

module.exports = router
