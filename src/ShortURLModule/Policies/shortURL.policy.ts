import { Request } from "express";

export class ShortURLPolicy{
    getShortURL(req: Request){
        const {shortURL} = req.params;
        return shortURL;
    }
}