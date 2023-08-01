import express, { Request, Response } from 'express'
import { body } from 'express-validator'
// import { RequestValidationError } from '../errors/request-validation'
import { validateRequest } from '../middlewares/validate-request'
import { Password } from '../services/passord'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('you must supply a password')
], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email }, (err: {}, userFound : {})=> { return userFound})
        console.log("/api/users/signin --> existing user object", existingUser)
        if(!existingUser) {
            throw new BadRequestError('Invalid Creds')
        }
        const passwordsMatch = await Password.compare(existingUser.password, password)
        if(!passwordsMatch) {
            throw new BadRequestError('Incorrect password')
        }
        //send jwt in a cookie
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, 'asdf')

        //assign a session property on the request object
        //assign jwt to session object
        req.session = {
            jwt: userJwt
        }

    return res.status(200).send({existingUser})
})

export { router as signInRouter}