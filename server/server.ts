import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello ");
});

app.listen(6000, () => {
  console.log("Server is running on port 6000");
})