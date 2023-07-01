import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import config from "../env.ts";
import { MyRequest } from "../interfaces-backend.ts";

export function getToken(req: MyRequest, res: Response, next: NextFunction) {
	try {
		const token = req.get("Authorization");
		req.decoded = undefined;
		if (token) {
			jwt.verify(token, config.jwt_token, (err, decoded) => {
				if (!err) req.decoded = decoded;
			});
		}
		next();
	} catch (error) {
		req.decoded = undefined;
		next();
	}
}

export function isLogged(req: MyRequest, res: Response, next: NextFunction) {
	try {
		const token = req.get("Authorization");
		if (token) {
			jwt.verify(token, config.jwt_token, (err, decoded) => {
				if (err) {
					res.sendStatus(401);
				} else {
					req.decoded = decoded;
					next();
				}
			});
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
