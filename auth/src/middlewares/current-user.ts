import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
    id: string,
    email: string
}

declare global { // Modify Request Object
    namespace Express {
        interface Request {
            currentUser?: UserPayload //assign currentUser property to the Request object with its value as UserPayload OR undefined
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt,'asdf') as UserPayload
        req.currentUser = payload
    } catch (e) {
        console.log(e)
    } 
    next()
    
}