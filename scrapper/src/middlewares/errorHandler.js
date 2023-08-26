import { CustomError } from "../errors/CustomError.js";

const errorHandler = (err, req,res, next) => {
    console.error(err)
    if(err instanceof CustomError){
        res.status(err.statusCode).json({ errors: err.serializeError() });
    }else if(err instanceof Error){
         res.status(400).json({
            message: [{ message: err.message }],
        });
    }
}

export {errorHandler};