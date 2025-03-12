const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS for frontend-backend communication
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// ✅ FIX: Use Render's PORT environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Serve React frontend (if applicable)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Example API route to test if the backend is running
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
