import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./envVariables";
import { JWTOptions, setCookieObject} from "./functionObject";
import { Request, Response } from "express";
import { validate } from "../validate";
import { AuthorizationError, BadRequestError } from "./apiError";

export const generateJwt=(id : string|Buffer|object)=>{
    const token = jwt.sign({id}, JWT_SECRET, JWTOptions);
    return token;
}

export const setCookie = (res : Response, key:string, value: string)=>{
    res.cookie(key, value, setCookieObject);
    return;
}

export const verifyJwtToken = (token: string)=>{
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log(error.message);
        throw new AuthorizationError("Token Expired, Please re-login !!");
    }
}