import {CustomError} from './custom-error'

export class NotAuthorized extends CustomError {
    statusCode = 401
    constructor() {
        super()

        Object.setPrototypeOf(this, NotAuthorized.prototype)
    }


    serializeErrors() {
        return [{message: 'not authorized'}]
    }
}