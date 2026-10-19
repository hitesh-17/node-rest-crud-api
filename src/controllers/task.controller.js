import { taskService } from "../services/task.service.js";
import { AppError } from "../utils/AppError.js";
import { respond } from "../utils/respond.js";

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
    console.log(req.headers.accept);
    const data = taskService.getAllTask({ page, limit, sortBy, order });

    const payload = {message:"Get All the Data",data:data.data,meta:data.meta}
    return respond(req,res,200,payload,"task");
  },
  getOne(req, res) {
    const dataByID = taskService.getTaskByID(req.taskId);

    const payload = {message:"Get data by ID",data:dataByID};
    return respond(req,res,200,payload);
  },
  create(req, res) {

    const result = taskService.createTask(req.body);
    const payload = {message:"data created successfully",data:result}
    return respond(req,res,201,payload);
  },

  replace(req, res) {
    const result = taskService.replaceByID(req.taskId, req.body);

    const payload = {message:"data replaced successfully",data:result}
    return respond(req,res,200,payload);
  },

  update(req, res) {
    const result = taskService.updateByID(req.taskId, req.body);

    const payload = {message:"data updated successfully",data:result}
    return respond(req,res,200,payload);
  },

  remove(req, res) {
    taskService.removeByID(req.taskId);
    return res.status(204).send();
  },
};
