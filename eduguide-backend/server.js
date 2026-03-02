const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// ------- import routes ----------------
const authRoutes = require("./src/modules/auth/auth.routes");
const courseRoutes = require("./src/modules/course/course.routes");
const enrollRoutes = require("./src/modules/courseEnroll/enroll.routes");
const aiRecommendationRoutes = require("./src/modules/ai-recommendation/aiRecommendation.routes");

dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS Configuration

app.use(
  cors({
    origin: true, // allow all origins 
    credentials: true,
  })
);

app.use(express.json());

// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/ai-recommendation", aiRecommendationRoutes);

app.get("/", (req, res) => {
  res.send("EduGuide AI API Running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`)
);