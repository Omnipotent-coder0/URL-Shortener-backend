import { Request, Response } from "express";
import { ShortURLModule } from "..";
import { ShortURLPolicy } from "../Policies/shortURL.policy";
import { ShortURLService } from "../Services/shortURL.service";
import { ApiError } from "../../shared/utils/apiError";

export class ShortURLController {
    private service: ShortURLService;
    private policy: ShortURLPolicy;
    constructor() {
        this.service = new ShortURLService();
        this.policy = new ShortURLPolicy();
    }
    tempRedirect = async(req: Request, res: Response)=>{
        try {
            const shortURL = this.policy.getShortURL(req);
            const originalURL: string = await this.service.getOriginalURL(shortURL);
            res.set('Cache-Control', 'no-store');
            res.redirect(302, originalURL);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).send({ error: error.message });
            }
            else if (error instanceof Error)
                res.status(500).send({ error: error.message });
            else {
                console.log({ error });
                res.status(500).send({ message: "Something Went Wrong !" });
            }
        }
    }
}