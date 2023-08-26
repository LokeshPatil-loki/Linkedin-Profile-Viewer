import { CustomError } from "./CustomError.js";

export class NotFoundError extends CustomError {
    constructor(message) {
        super(message ? message : "Route not found");
        this.statusCode = 404;
        this.message = message ? message : "Route not found"
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeError() {
        return { message: this.message};
    }
}