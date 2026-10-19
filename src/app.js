import express from "express";
import router from "./routes/task.routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

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

app.use(notFound);

app.use(errorHandler);

export default app;