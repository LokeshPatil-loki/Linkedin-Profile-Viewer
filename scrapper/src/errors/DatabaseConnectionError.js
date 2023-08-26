import { CustomError } from "./CustomError.js";

export class DatabaseConnectionError extends CustomError {
    constructor(message) {
        super(message ?? "Error connecting to Database");
        this.statusCode = 500;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeError() {
        return { message: "Database Connection Error" };
    }
}
