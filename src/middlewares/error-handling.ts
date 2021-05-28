import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'


export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    if(err instanceof CustomError) {
        console.log('handling as a custom error')

        return res.status(err.statusCode).send({mali: err.serializeErrors()})
    }
    //any other error
    res.status(400).send({
        message: err.message
    })
} 