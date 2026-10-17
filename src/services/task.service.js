import { taskRepository } from "../repositories/task.repository.js";
import { AppError } from "../utils/AppError.js";

export const taskService = {
  getAllTask() {
    return taskRepository.findall();
  },
  getTaskByID(id) {
    const task = taskRepository.findByID(id);
    if (task === null) {
      throw new AppError("Task not found", 404);
    }
    return task;
  },
};
