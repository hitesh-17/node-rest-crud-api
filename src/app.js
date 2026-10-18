import express from "express";
import router from "./routes/task.routes.js";

const app = express();

app.use(express.json())

app.get("/health", (req, res) => {
  res.json({ statusCode: 200, status: "ok" });
});


app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running.......",
  });
});

app.use("/api/v1/tasks", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode : err.statusCode,
    message: err.message ||"Internal Server Error",
  });
});

export default app;