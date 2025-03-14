const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define PORT for Render Deployment
const PORT = process.env.PORT || 10000;

// Simple test route
app.get("/", (req, res) => {
    res.send("Hello! The Social Work Monopoly Game server is running.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
