import {z} from "zod";

export const taskFields  = z.object({
    title :z.string().trim().min(1,"title is require").max(100),
    description:z.string().trim().max(500).optional(),
    status:z.enum(["todo","in_progress","done"])
});

export const  createTaskSchema = taskFields.extend({
    status:taskFields.shape.status.default("todo"),
})

export const putTaskSchema = taskFields;

export const partialTaskSchema = taskFields.partial().refine((d) => Object.keys(d).length > 0,"atleast one field required");