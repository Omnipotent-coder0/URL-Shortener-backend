import { Router } from "express";
import { ShortURLController } from "./Controllers/shortURL.controller";

export class ShortURLModule{
    public router: Router;
    private controller: ShortURLController
    constructor(){
        this.router = Router();
        this.controller = new ShortURLController();
        this.initializeRoutes();
    }
    private initializeRoutes = async()=>{
        this.router.route("/:shortURL")
            .get(this.controller.tempRedirect);
    }
}