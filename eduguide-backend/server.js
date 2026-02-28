const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// ------- import routes ----------------
const authRoutes = require("./src/modules/auth/auth.routes");
const courseRoutes = require("./src/modules/course/course.routes");
const enrollRoutes = require("./src/modules/courseEnroll/enroll.routes");

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:8081', 'exp://192.168.8.138:8081', 'http://192.168.8.138:8081'],
  credentials: true
})); 
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enroll", enrollRoutes);

app.get("/", (req, res) => {
  res.send("EduGuide AI API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`)
);