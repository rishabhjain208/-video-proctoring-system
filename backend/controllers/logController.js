// controllers/logController.js
const Log = require("../models/Log");

// Create a new log entry
exports.createLog = async (req, res) => {
  try {
    const { entry, interviewId } = req.body;

    if (!entry || !entry.type) {
      return res.status(400).json({
        success: false,
        message: "Missing entry data",
      });
    }

    const log = new Log({
      time: entry.time ? new Date(entry.time) : new Date(),
      type: entry.type,
      detail: entry.detail,
      interviewId: interviewId || null,
    });

    await log.save();
    return res.status(201).json({
      success: true,
      message: "Log entry created successfully",
      data: log,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: e.message || "Failed to create log",
    });
  }
};

// Get all logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ time: -1 });
    return res.status(200).json({
      success: true,
      message: "Logs fetched successfully",
      data: logs,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message || "Failed to fetch logs",
    });
  }
};
