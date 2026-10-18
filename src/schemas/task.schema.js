import {z} from "zod";

export const createTaskSchema = z.object({
    title :z.string().trim().min(1,"title is require").max(100),
    description:z.string().trim().max(500).optional(),
    status:z.enum(["todo","in_progress","done"]).default("todo")
});