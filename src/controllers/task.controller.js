import { taskService } from "../services/task.service.js";
import { AppError } from "../utils/AppError.js";

export const taskController = {
  list(req, res) {
    const data = taskService.getAllTask();
    return res.status(200).json({
      message: "Get ALL the Data",
      data: data,
    });
  },
  getOne(req, res) {
    const id = Number(req.params.id);

    if (id == null) {
      throw new AppError("data not found", 404);
    }
    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("Invalid task id", 400);
    }
    
    const dataByID = taskService.getTaskByID(id);
    return res.status(200).json({
      message: "Get data by ID",
      data: dataByID,
    });
  },
};
