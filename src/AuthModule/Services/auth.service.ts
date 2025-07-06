import { Response } from "express";
import { removeCookie, setCookie } from "../../shared/utils/helpers";

export class AuthService {
    public setCookieToken = async (res: Response, token: string,)=>{
        setCookie(res, "jwtToken", token);
        return;
    }

    public removeCookie = async (res: Response)=>{
        removeCookie(res, "jwtToken");
        return;
    }
}