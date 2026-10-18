import { Router } from "express";
import {taskController} from "../controllers/task.controller.js"
import { validate } from "../middleware/validate.js";
import { createTaskSchema, partialTaskSchema, putTaskSchema} from "../schemas/task.schema.js";
import { AppError } from "../utils/AppError.js";

const router = Router();

router.get('/',taskController.list);
router.get('/:id',taskController.getOne);

router.post('/',validate(createTaskSchema),taskController.create);
router.put('/:id',validate(putTaskSchema), taskController.replace);
router.patch('/:id',validate(partialTaskSchema),taskController.update);

router.delete('/:id',taskController.remove);

router.param("id",(req,res,next,value)=>{
    const id = Number(value);
    if(!Number.isInteger(id) || id<1){
        return next(new AppError("Invalid Task Id",400))
    }
    req.taskId = id;
    next();
})

export default router;