const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS to allow frontend to communicate with the backend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Set the PORT (Render requires process.env.PORT)
const PORT = process.env.PORT || 3001;

// Serve the React frontend (if applicable)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Example API endpoint
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
