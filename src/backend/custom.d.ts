import { Request } from "express";

export interface MyRequest extends Request {
	decoded: string | jwt.JwtPayload | undefined;
}
