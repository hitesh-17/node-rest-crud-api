import { Router } from "express";
import {taskController} from "../controllers/task.controller.js"
import { validate } from "../middleware/validate.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get('/',taskController.list);
router.get('/:id',taskController.getOne);

router.post('/',validate(createTaskSchema),taskController.create);

export default router;