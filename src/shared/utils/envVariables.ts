export const PORT = process.env.PORT || 3000;
export const BASE_URL = process.env.BASE_URL || "/api";
export const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/e-comm";
export const JWT_SECRET = process.env.JWT_SECRET || "bf5e69de772ed1327595d50e0bfecc0e32515e7d08809752a73acc65f158a90d";
export const NODE_ENV = process.env.NODE_ENV || "Development";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "3h";
export const COOKIE_EXPIRY = process.env.COOKIE_EXPIRY || 10800000;