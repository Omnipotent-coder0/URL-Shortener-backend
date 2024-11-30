import { Request } from "express";
import { IUserLoginDto } from "../types/login.types";

export class LoginPolicy{
    public getUserLoginPayload = (req: Request) : IUserLoginDto =>{
        const {email, password} = req.body;
        return {email, password};
    }
}