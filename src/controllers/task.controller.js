import { taskService } from "../services/task.service.js";
import { AppError } from "../utils/AppError.js";

const SORTABLE_FIELDS = ["createdAt", "title", "status"];

export const taskController = {
  list(req, res) {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const sortBy = req.query.sortBy ?? "createdAt";
    const order = req.query.order ?? "asc";

    if (!Number.isInteger(page) || page < 1)
      throw new AppError("page must be an integer >= 1", 400);

    if (!Number.isInteger(limit) || limit < 1 || limit > 50)
      throw new AppError("limit must be an integer between 1 and 50", 400);

    if (!SORTABLE_FIELDS.includes(sortBy))
      throw new AppError(
        `sortBy must be one of: ${SORTABLE_FIELDS.join(", ")}`,
        400,
      );

    if (order !== "asc" && order !== "desc")
      throw new AppError("order must be 'asc' or 'desc'", 400);

    const data = taskService.getAllTask({ page, limit, sortBy, order });
    return res.status(200).json({
      message: "Get ALL the Data",
      data: data.data,
      meta: data.meta,
    });
  },
  getOne(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("Invalid task id", 400);
    }

    const dataByID = taskService.getTaskByID(id);
    return res.status(200).json({
      message: "Get data by ID",
      data: dataByID,
    });
  },
  create(req, res) {
    const result = taskService.createTask(req.body);
    return res.status(201).json({
      message: "data created successfully",
      data: result,
    });
  },

  replace(req, res) {
    const result = taskService.replaceByID(req.taskID,req.body);
    return res.status(200).json({
      message: "data updated successfully",
      data: result,
    });
  },

  update(req, res) {
    const result = taskService.updateByID(req.taskID,req.body);
    return res.status(200).json({
      message: "data updated successfully",
      data: result,
    });
  },
};
