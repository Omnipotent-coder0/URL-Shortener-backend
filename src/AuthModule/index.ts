import { NextFunction, Request, Response, Router } from "express";
import { LoginController } from "./Contollers/login.controller";
import { SuccessResponse } from "../shared/utils/successResponse";
import { responseProcessor } from "../shared/utils/responseProcessor";
import { SignupController } from "./Contollers/signup.controller";
import { postLogin, postSignup } from "./validators/auth.validator";
import { validate } from "../shared/validate";
import { AuthController } from "./Contollers/auth.controller";

export class AuthModule {
    public router: Router;
    private loginController: LoginController;
    private signupController: SignupController;
    private controller: AuthController;
    constructor() {
        this.router = Router();
        this.loginController = new LoginController();
        this.signupController = new SignupController();
        this.controller = new AuthController();
        this.initializeRoutes();
    }
    public initializeRoutes = async () => {
        this.router.post("/login", validate(postLogin), responseProcessor(this.loginController.login));
        this.router.post("/signup", validate(postSignup), responseProcessor(this.signupController.signup));
        this.router.post("/logout", responseProcessor(this.controller.logout));
    }
}