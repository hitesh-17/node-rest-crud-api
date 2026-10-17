import { Router } from "express";
import {taskController} from "../controllers/task.controller.js"

const router = Router();

router.get('/task/',taskController.list);
router.get('/task/:id',taskController.getOne);

export default router;