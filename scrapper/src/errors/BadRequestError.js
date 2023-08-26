import { CustomError } from "./CustomError.js";

export class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeError() {
        return { message: this.message };
    }
}