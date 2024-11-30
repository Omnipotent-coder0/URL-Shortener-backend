import { Router } from "express";
import { UserController } from "./Controllers/user.controller";
import { responseProcessor } from "../shared/utils/responseProcessor";

export class UserModule{
    public router: Router;
    private controller : UserController;
    constructor(){
        this.router = Router();
        this.controller = new UserController();
        this.initializeRoutes();
    }
    private initializeRoutes = async()=>{
        this.router.get("/me", responseProcessor(this.controller.getMeUser));
    }

}