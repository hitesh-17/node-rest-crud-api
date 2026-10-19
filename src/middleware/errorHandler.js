import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }
  let statusCode = 500;
  let message = "Internal sever error";
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "invalide Json parse req body";
  } else {
    console.error(err);
  }

  return res.status(statusCode).json({
    message,
    statusCode,
  });
};
