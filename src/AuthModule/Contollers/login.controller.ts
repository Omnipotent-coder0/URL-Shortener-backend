import { Request, Response } from "express";
import { LoginService } from "../Services/login.service";
import { SuccessResponse } from "../../shared/utils/successResponse";
import { LoginPolicy } from "../Policies/login.policy";
import { AuthService } from "../Services/auth.service";

export class LoginController{
    private service: LoginService;
    private authService : AuthService;
    private policy: LoginPolicy;
    constructor(){
        this.service = new LoginService();
        this.authService = new AuthService();
        this.policy = new LoginPolicy();
    }
    public login = async(req: Request, res: Response)=>{
        const userLoginPayload = this.policy.getUserLoginPayload(req);
        const response =await this.service.login(userLoginPayload);
        await this.authService.setCookieToken(res, response.token);
        return new SuccessResponse(response);
    }
}