import { Request, Response } from "express";
import { Post } from "../../common/interfaces.ts";
import { query } from "./db.service.ts";

export async function getPosts(req: Request, res: Response) {
	try {
		const [rows] = await query("SELECT * FROM posts");
		// TODO paginacion?
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getPost(req: Request, res: Response) {
	try {
		const [rows] = await query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function savePost(req: Request, res: Response) {
	const post: Post = req.body;
	// TODO guardar tags
	// req.body.post y req.body.tags
	try {
		await query(
			`
			INSERT INTO posts (blog_id, image_url, title, body, excerpt, url, visibility) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[post.blog_id, post.image_url, post.title, post.body, post.excerpt, post.url, post.visibility]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function updatePost(req: Request, res: Response) {
	const post: Post = req.body;
	// TODO guardar tags
	try {
		query(
			`
			UPDATE posts SET image_url=?, title=?, body=?, excerpt=?, url=?, visibility=? WHERE id=?`,
			[post.image_url, post.title, post.body, post.excerpt, post.url, post.visibility, post.id]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function deletePost(req: Request, res: Response) {
	try {
		await query("DELETE FROM posts WHERE id = ?", [req.params.id]);
		res.sendStatus(200);
		// TODO borrar imagenes relacionadas con ese post
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
