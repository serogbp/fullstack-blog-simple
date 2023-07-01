import { Request } from "express";
import jwt from "jsonwebtoken";

export interface MyRequest extends Request {
	decoded: string | jwt.JwtPayload | undefined;
}
