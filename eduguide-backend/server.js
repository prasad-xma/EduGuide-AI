const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// ------- import routes ----------------
const authRoutes = require("./src/modules/auth/auth.routes");

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ---------- Routes ----------
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("EduGuide AI API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);