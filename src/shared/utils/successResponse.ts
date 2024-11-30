import { StatusCodes } from "http-status-codes";

export class SuccessResponse {
    public data: any;
    public statusCode: StatusCodes;
    public message: string;

    constructor(
        data: any,
        message = "Successfully Provided Response",
        statusCode: StatusCodes = StatusCodes.OK
    ) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
}