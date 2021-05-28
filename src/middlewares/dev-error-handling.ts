import  { Request, Response, NextFunction } from 'express'
// import { RequestValidationError } from '../errors/request-validation'
// import { DatabaseConnectionError } from '../errors/database-connection'
import { CustomError } from '../errors/custom-error'


//custom error handling middleware
export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    // if(err instanceof RequestValidationError) {
    //     console.log('handling as a custom request validation error')
    //     // ensure that the middleware doesn't have to format the errors
    //         const formattedErrors = err.mali.map(error => { //map over mali property
    //             return { message: error.msg, field: error.param}
    //         })
    //         return res.status(400).send({mali: formattedErrors})
    //     // return res.status(err.statusCode).send({mali: err.serializeErrors()})    
    // }
    if(err instanceof CustomError) { //uncomment
    // if(err instanceof RequestValidationError) {
        // console.log('handling as a custom error, sucka')

        // return res.status(500).send([{mali: err.message}])
        return res.status(err.statusCode).send({mali: err.serializeErrors()})
    }
    //any other error
    res.status(400).send({
        message: err.message
    })
} 