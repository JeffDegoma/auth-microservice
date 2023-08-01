import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
    statusCode = 404 //expects a status
    constructor(){
        super() //expects a message

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    serializeErrors(){
        return [{message: 'route not found!'}]
    }
}