import  {Request, Response, NextFunction} from 'express'
import {NotAuthorized} from '../errors/not-authroized-error'

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.currentUser) {
        throw new NotAuthorized()
    }
    next()
}
 