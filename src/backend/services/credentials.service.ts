import { Request, Response } from "express";

import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { query } from "./db.service.ts";
import { Token } from "../../common/interfaces.ts";
import config from "../env.ts";

export async function signIn(req: Request, res: Response) {
	try {
		const { email, password, username } = req.body;
		const encryptedPassword = bcrypt.hashSync(password, 10);
		await query(
			`
			INSERT INTO users (email, password, username) VALUES (?, ?, ?) `,
			[email, encryptedPassword, username]
		);
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		const [rows] = await query(`SELECT * FROM users WHERE email = ?`, [email]);
		const user = (rows as RowDataPacket[])[0];

		if (user && bcrypt.compareSync(password, user.password)) {
			const tokenData: Token = {
				id: user.id,
				email: user.email,
			};
			const secret = config.jwt_token.toString();
			const token = jwt.sign(tokenData, secret);

			return res.status(200).json(token);
		} else {
			return res.sendStatus(401);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
