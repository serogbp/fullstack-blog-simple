import { Request, Response } from "express";
import { query } from "./db.service.ts";

export async function getTags(req: Request, res: Response) {
	const { blog_id } = req.body;
	try {
		const [rows] = await query(
			`
			SELECT t.name
			FROM tags t
			JOIN post_tags pt ON t.id = pt.tag_id
			JOIN posts p ON pt.post_id = p.id
			JOIN blogs b ON p.blog_id = b.id
			WHERE b.id = ?;
		`,
			[blog_id]
		);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getPostsByTag(req: Request, res: Response) {
	const tag = req.params.id;
	const { blog_id } = req.body;
	try {
		// TODO paginacion?
		const [rows, fields] = await query(
			`
		SELECT p.id, p.blog_id, p.image_url, p.title, p.body, p.excerpt, p.url, p.visibility, p.created_at
		FROM posts p
		JOIN post_tags pt ON p.id = pt.post_id
		JOIN tags t ON pt.tag_id = t.id
		JOIN blogs b ON p.blog_id = b.id
		WHERE b.id = ? AND t.name = ?;
		`,
			[blog_id, tag]
		);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
