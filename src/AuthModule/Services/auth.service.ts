import { Response } from "express";
import { setCookie } from "../../shared/utils/helpers";

export class AuthService {
    public setCookieToken = async (res: Response, token: string,)=>{
        setCookie(res, "jwtToken", token,);
        return;
    }
}