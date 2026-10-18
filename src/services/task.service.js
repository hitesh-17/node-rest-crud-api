import { taskRepository } from "../repositories/task.repository.js";
import { AppError } from "../utils/AppError.js";

export const taskService = {
  getAllTask({page, limit, sortBy, order}) {
    const all = taskRepository.findAll();

    const dir = order === "desc" ? -1 : 1;
    const sorted = [...all].sort((a, b) => {
      return String(a[sortBy]).localeCompare(String(b[sortBy]))*dir
    });

    // console.log(sorted);
    // 2. Calculate pagination
    const total = sorted.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;

    const data = sorted.slice(startIndex, startIndex + limit);
    // console.log(data);
    // return taskRepository.findAll();
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },
  getTaskByID(id) {
    const task = taskRepository.findByID(id);
    if (task === null) {
      throw new AppError("Task not found", 404);
    }
    return task;
  },

  createTask(data){
    return taskRepository.create(data);
  },
};
