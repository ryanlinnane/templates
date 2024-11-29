import express from "express";
import cors from "cors";
import path from 'path';

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.send("🐱");
});

// Serve static files from the `public` directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the `public/dist` directory
app.use(express.static(path.join(__dirname, 'public/dist')));

// Fallback to index.html for SPA routes (if applicable)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});