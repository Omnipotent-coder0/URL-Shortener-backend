import { Request, Response } from "express";
import { SignupService } from "../Services/signup.service";
import { SuccessResponse } from "../../shared/utils/successResponse";
import { SignupPolicy } from "../Policies/signup.policy";
import { validationResult } from "express-validator";
import { IUserInput } from "../../shared/modals/user.modal";

export class SignupController{
    private service: SignupService;
    private policy: SignupPolicy;
    constructor(){
        this.service = new SignupService();
        this.policy = new SignupPolicy();
    }
    public signup = async(req: Request, res: Response)=>{
        const userSignupDto: IUserInput  = this.policy.getSignupPayload(req);
        const onBoardedUser = await this.service.onBoardedUser(userSignupDto)
        return new SuccessResponse(onBoardedUser);
    }
}