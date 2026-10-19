import { AppError } from "../utils/AppError.js"

export const notFound = (req,res,next) =>{
    next(new AppError(`Route ${req.url} not found`,404));
}