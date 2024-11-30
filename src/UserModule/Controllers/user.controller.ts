import { Request, Response } from "express";
import { UserService } from "../Services/user.service";
import { UserPolicy } from "../Policies/user.policy";
import { SuccessResponse } from "../../shared/utils/successResponse";
import { AuthorizationError } from "../../shared/utils/apiError";

export class UserController{
    private service: UserService;
    private policy: UserPolicy;
    constructor(){
        this.service = new UserService();
        this.policy = new UserPolicy();
    }
    public getMeUser = async(req: Request, res: Response)=>{
        const me = this.policy.getMeUser(req);
        const findUser = await this.service.getUserById(me.id);
        return new SuccessResponse(findUser);
        // const findUser = this.service.getUserById()
    }
}