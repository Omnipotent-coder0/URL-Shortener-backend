import { StatusCodes } from "http-status-codes";

export class ApiError extends Error{
    public statusCode: StatusCodes;
    constructor(statusCode: StatusCodes, message: string, ){
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError{
    constructor(message: string){
        super(StatusCodes.BAD_REQUEST, message);
        this.name = "Bad Request Error";
    }
}

export class PageNotFoundError extends ApiError{
    constructor(message= "Page not Found !"){
        super(StatusCodes.NOT_FOUND, message);
        this.name = "Page Not Found";
    }
}

export class AuthorizationError extends ApiError{
    constructor(message= "Authoriztion Error !"){
        super(StatusCodes.UNAUTHORIZED, message);
        this.name = "Unauthorized Error";
    }
}