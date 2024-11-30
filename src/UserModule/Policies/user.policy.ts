import { Request } from "express";

export class UserPolicy{
    public getMeUser=(req: Request)=>{
        const {me} = req.body;
        return me;
    }
}