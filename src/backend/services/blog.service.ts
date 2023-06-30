import { Request, Response } from "express";
import { query } from "./db.service.ts";
import { Post } from "../../common/interfaces.ts";

export async function getBlogs(req: Request, res: Response) {
	try {
		//TODO paginacion?
		const [rows] = await query("SELECT * FROM blogs");
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getPosts(req: Request, res: Response) {
	const blog_id = req.params.id;
	try {
		const [rows] = await query("SELECT * FROM posts WHERE blog_id = ?", [blog_id]);
		// TODO paginacion?
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
