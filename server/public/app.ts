import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(6000, () => {
  console.log("Server is running on port 6000");
})