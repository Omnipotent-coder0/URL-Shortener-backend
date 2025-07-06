import { Request, Response } from "express";
import { SignupService } from "../Services/signup.service";
import { SuccessResponse } from "../../shared/utils/successResponse";
import { SignupPolicy } from "../Policies/signup.policy";
import { validationResult } from "express-validator";
import { IUserInput } from "../../shared/modals/user.modal";
import { AuthService } from "../Services/auth.service";

export class SignupController{
    private service: SignupService;
    private policy: SignupPolicy;
    private authService: AuthService;
    constructor(){
        this.service = new SignupService();
        this.authService = new AuthService();
        this.policy = new SignupPolicy();
    }
    public signup = async(req: Request, res: Response)=>{
        const userSignupDto: IUserInput  = this.policy.getSignupPayload(req);
        const response = await this.service.onBoardedUser(userSignupDto)
        await this.authService.setCookieToken(res, response.token);
        return new SuccessResponse(response, "User Successfully created", 201);
    }
}