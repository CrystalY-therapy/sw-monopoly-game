const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS (so frontend can communicate with backend)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// 🚀 FIX: Use Render's PORT or default to 3001
const PORT = process.env.PORT || 3001;

// Serve React frontend (if applicable)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Example API route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
