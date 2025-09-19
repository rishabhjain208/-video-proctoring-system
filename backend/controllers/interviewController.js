// controllers/interviewController.js
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Interview = require("../models/Interview");
const Log = require("../models/Log");
const { computeReport } = require("../helpers/reportHelper");

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, unique + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware for handling video upload
exports.uploadMiddleware = upload.single("video");

// Upload interview + logs
exports.uploadInterview = async (req, res) => {
  try {
    const { candidateName, logs } = req.body;
    const parsedLogs = logs ? JSON.parse(logs) : [];

    const interview = new Interview({
      candidateName: candidateName || "unknown",
      startTime: new Date(),
      endTime: new Date(),
      videoPath: req.file ? `/uploads/${req.file.filename}` : null,
      durationSec: 0,
      logs: [],
    });
    await interview.save();

    // Save logs to DB and link
    for (const entry of parsedLogs) {
      const l = new Log({
        time: entry.time ? new Date(entry.time) : new Date(),
        type: entry.type,
        detail: entry.detail,
        interviewId: interview._id,
      });
      await l.save();
      interview.logs.push(l._id);
    }

    // Compute stats & integrity score
    const report = await computeReport(interview._id);
    interview.integrityScore = report.integrityScore;
    await interview.save();

    return res.status(201).json({
      success: true,
      message: "Interview uploaded successfully",
      data: { interviewId: interview._id, report },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: e.message || "Failed to upload interview",
    });
  }
};

// Fetch report
exports.getReport = async (req, res) => {
  try {
    const id = req.params.id;
    const report = await computeReport(id);
    return res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      data: report,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message || "Failed to fetch report",
    });
  }
};
