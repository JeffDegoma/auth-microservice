import { CustomError } from './custom-error'
import { ValidationError } from 'express-validator'


//build custom implementation of an Error
//RequestValidationError is a subclass of CustomError
export class RequestValidationError extends CustomError { //extends CustomError object
    statusCode = 400

    constructor(public mali: ValidationError[]) { //create and assign "mali" as a property to the new class
        super()

        //Error is an object that is built in javascript
        //Object.setPrototypeof extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)    
    }
    serializeErrors() {
        return this.mali.map(err => {
            return {message: err.msg, field: err.param}
        })
    }
}  