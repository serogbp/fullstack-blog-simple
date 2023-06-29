import { Request, Response } from "express";
import { query } from "./db.service";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { Token } from "../../common/interfaces";
import jwt from "jsonwebtoken";
import config from "../env";

export async function register(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		await query(
			`
			INSERT INTO users (email, password) VALUES (?, ?) `,
			[email, password]
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
			const userBlogs = await getUserBlogs(user.id);
			const tokenData: Token = {
				id: user.id,
				email: user.email,
				owned_blogs: userBlogs as string[],
			};
			const secret = config.jwt_token.toString();
			const token = jwt.sign(tokenData, secret);

			return res.status(200).json(token);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function getUserBlogs(user_id: string) {
	try {
		const [rows] = await query(
			`
			SELECT b.name, b.description
			FROM blogs b
			JOIN users u ON b.user_id = u.id
			WHERE u.id = ?;
		`,
			[user_id]
		);
		return (rows as RowDataPacket[]).map((row) => row.toString());
	} catch (error) {
		console.log(error);
		throw Error("No se pudo obtener los blogs del usuario intentando logearse");
	}
}
