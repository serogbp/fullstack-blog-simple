import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import config from "../env.ts";
import { MyRequest } from "../custom";
import { Token } from "../../common/interfaces.ts";

function isLogged(req: MyRequest, res: Response, next: NextFunction) {
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

function isBlogOwner(req: MyRequest, res: Response, next: NextFunction) {
	try {
		const { blog_id } = req.body;
		const token = req.decoded as Token;

		if (token.owned_blogs.includes(blog_id)) {
			next();
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
