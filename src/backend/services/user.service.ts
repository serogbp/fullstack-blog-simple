import { Request, Response } from "express";
import { query } from "./db.service.ts";
import { Blog, Token, User } from "../../common/interfaces.ts";
import { MyRequest } from "../interfaces-backend.ts";

export async function createBlog(req: Request, res: Response) {
	try {
		const blog = req.body as Blog;
		await query(
			`
			INSERT INTO blogs (user_id, slug, name, description)
			VALUES (?, ?, ?, ?);`,
			[blog.user_id, blog.slug, blog.name, blog.description]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getBlogsFromUsername(req: Request, res: Response) {
	try {
		const [rows] = await query(
			`
			SELECT b.*
			FROM blogs b
			JOIN users u ON b.user_id = u.id
			WHERE u.username = ?;
			`,
			[req.params.username]
		);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getUser(req: Request, res: Response) {
	try {
		const [rows] = await query(
			`
			SELECT id, username, email, created_at
			FROM users
			WHERE username = ?;
			`,
			[req.params.username]
		);
		const user = (rows as User[])[0];
		res.send(user);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getUserLoggedIn(req: MyRequest, res: Response) {
	try {
		const token = req.decoded as Token;
		const [rows] = await query(
			`
			SELECT id, username, email, created_at
			FROM users
			WHERE username = ?;
			`,
			[token.username]
		);
		const user = (rows as User[])[0];
		res.send(user);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
