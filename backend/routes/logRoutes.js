// routes/logRoutes.js
const express = require('express')
const router = express.Router()
const logController = require('../controllers/logController')

// POST /api/logs
router.post('/', logController.createLog)

// GET /api/logs (optional)
router.get('/', logController.getLogs)

module.exports = router
