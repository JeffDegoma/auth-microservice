import express, { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError} from '../errors/bad-request-error'
import { RequestValidationError} from '../errors/request-validation'
// import { DatabaseConnectionError} from '../errors/database-connection'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('password must be more than 4 characters')
],  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        // console.log(errors.array())
        // return res.status(400).send(errors.array()) //send the errors array
        // throw new Error('something went wrong guy') //throw error with message
        throw new RequestValidationError(errors.array()) //forward errors array to be modified
    }
    //new user 
    const {email, password} = req.body
    const existingUser =  await User.findOne({ email })
    if (existingUser) {
        // console.log('email is in use')
        throw new BadRequestError('Email is in use')
    }

    const newUser = User.build( { email, password })
    await newUser.save()

    //generate jwt
    const userJwt = jwt.sign({
        id: newUser.id,
        email: newUser.email
    }, 'asdf') //signin key
    //store on session object
    req.session =  {
        jwt: userJwt
    }
    
    res.status(201).send(newUser)
}) 

export { router as signUpRouter} 