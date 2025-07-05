import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./envVariables";
import { JWTOptions, setCookieObject} from "./functionObject";
import { Response } from "express";
import { AuthorizationError, BadRequestError } from "./apiError";
import { Counter } from "../modals/counterDocument.modal";

const generateJwt=(id : string|Buffer|object)=>{
    const token = jwt.sign({id}, JWT_SECRET, JWTOptions);
    return token;
}

const setCookie = (res : Response, key:string, value: string)=>{
    res.cookie(key, value, setCookieObject);
    return;
}

const verifyJwtToken = (token: string)=>{
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log(error.message);
        throw new AuthorizationError("Token Expired, Please re-login !!");
    }
}

function toUrlSafeBase64(num: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  if (num === 0) return chars[0];
  let result = "";
  while (num > 0) {
    result = chars[num % 64] + result;
    num = Math.floor(num / 64);
  }
  return result;
}

function fromUrlSafeBase64(str: string): number {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result = result * 64 + chars.indexOf(str[i]);
  }
  return result;
}

async function getNextSequence(name: string): Promise<number> {
  const counterDoc = await Counter.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } }, // increment value atomically
    { new: true, upsert: true } // create doc if not exists
  );
  return counterDoc!.value;
}

export {
    generateJwt,
    setCookie,
    verifyJwtToken,
    toUrlSafeBase64,
    fromUrlSafeBase64,
    getNextSequence,
}

