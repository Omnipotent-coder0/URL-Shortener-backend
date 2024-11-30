import { Request } from "express";
import { IUserInput } from "../../shared/modals/user.modal";

export class SignupPolicy{
    public getSignupPayload = (req: Request) : IUserInput =>{
        const {email, firstName, lastName, password, role} = req.body;
        return {email, firstName, lastName, password, role};
    }
}