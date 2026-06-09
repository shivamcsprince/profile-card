require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "PUT"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Routes
app.use("/api/profile", profileRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  const clientBuild = path.join(__dirname, "../../client/build");
  app.use(express.static(clientBuild));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuild, "index.html"));
  });
} else {
  // 404 handler (dev only)
  app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
