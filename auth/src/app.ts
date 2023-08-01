import express from 'express'
require('express-async-errors')
import cors from 'cors' //uncomment or remove in prod. pod communicaiton in k8s based on services
import { errorHandler } from './middlewares/dev-error-handling'
import {currentUserRouter} from './routes/current-user'
import {signUpRouter} from './routes/signup'
import {signInRouter} from './routes/signin'
import {signOutRouter} from './routes/signout'
import { NotFoundError } from './errors/not-found'
import cookieSession from 'cookie-session'

const app = express()
app.use(cors()) //remove in prod
app.set('trust proxy', true)
app.use(express.json())
app.use(
    cookieSession({
        signed: false, //disable encryption. cookie value will be JWT(tamper-proof)
        secure: false //change to true on prod for https protocol
    })
)


app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)


app.all('*', () => {
    throw new NotFoundError() //catch all routes not in the API
})
app.use(errorHandler) //custom error handling middleware

export { app }