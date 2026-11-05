
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SERVER_TOKEN = process.env.BUILD_SERVER_TOKEN;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "Universal App Build Server"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.post("/api/validate", (req, res) => {
  const token = req.headers.authorization;

  if (!SERVER_TOKEN || token !== `Bearer ${SERVER_TOKEN}`) {
    return res.status(401).json({
      success: false,
      message: "Invalid server token"
    });
  }

  res.json({
    success: true,
    message: "Server authentication successful"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Build server running on port ${PORT}`);
});
