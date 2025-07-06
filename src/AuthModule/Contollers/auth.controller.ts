import { Request, Response } from "express";
import { AuthService } from "../Services/auth.service";
import { SuccessResponse } from "../../shared/utils/successResponse";

export class AuthController{
    private service: AuthService;
    constructor(){
        this.service = new AuthService();
    }

    public logout = async (req: Request, res: Response)=>{
        await this.service.removeCookie(res);
        return new SuccessResponse({}, "Logout Successfully", 200);
    }

}