import express from "express";
import router from "./routes/task.routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";
import fs from "node:fs";

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

const spec = yaml.parse(fs.readFileSync(new URL("../docs/openapi.yaml",import.meta.url),"utf8"))

app.use("/docs",swaggerUi.serve,swaggerUi.setup(spec));

app.use(notFound);

app.use(errorHandler);

export default app;