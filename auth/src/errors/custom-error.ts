//ensures that types in subclasses adhere to statusCode and serialize structure
export abstract class CustomError extends Error {
    abstract statusCode: number

    constructor(){ 
        super()

        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract serializeErrors(): { message: string, field?: string}[] //array of objects with message property
}