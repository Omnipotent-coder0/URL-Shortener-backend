import { CookieOptions } from "express";
import { COOKIE_EXPIRY, JWT_EXPIRY, NODE_ENV } from "./envVariables";

const setCookieObject : CookieOptions = {
    maxAge: COOKIE_EXPIRY as number || undefined,
    httpOnly: true, // prevent xss attacks
    sameSite: "strict", // csrf attacks
    secure: NODE_ENV != "Development",
}
const emptyCookieObject: CookieOptions ={
    maxAge: 0,
    httpOnly: true, // prevent xss attacks
    sameSite: "strict", // csrf attacks
    secure: NODE_ENV != "Development",
}

const JWTOptions = {
    expiresIn: JWT_EXPIRY,
}

export {
    setCookieObject,
    emptyCookieObject,
    JWTOptions,
}