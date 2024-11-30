import { CookieOptions } from "express";
import { COOKIE_EXPIRY, JWT_EXPIRY, NODE_ENV } from "./envVariables";

export const setCookieObject : CookieOptions = {
    maxAge: COOKIE_EXPIRY as number || undefined,
    httpOnly: true, // prevent xss attacks
    sameSite: "strict", // csrf attacks
    secure: NODE_ENV != "Development",
}

export const JWTOptions = {
    expiresIn: JWT_EXPIRY,
}