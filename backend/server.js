// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();

dotenv.config();
const corsOptions = {
  origin: true,
  credentials: true,
};

const logRoutes = require("./routes/logRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.send("working");
});
app.use("/api/logs", logRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

mongoose.set("strictQuery", false);
const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Connect();
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;