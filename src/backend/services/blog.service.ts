import { Request, Response } from "express";
import { query } from "./db.service.ts";

export async function getPosts(req: Request, res: Response) {
	try {
		const itemsPerPage: number = parseInt(req.query.itemsPerPage as string) || 10;
		const page: number = parseInt(req.query.page as string) || 1;
		const offset: number = (page - 1) * itemsPerPage;

		const [rows] = await query(
			`
			SELECT	*
			FROM posts
			ORDER BY created_at DESC
			LIMIT ?, ?;
		`,
			[offset, itemsPerPage]
		);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getPost(req: Request, res: Response) {
	try {
		//TODO
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function createPost(req: Request, res: Response) {
	try {
		// TODO
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function updatePost(req: Request, res: Response) {
	try {
		const post = req.body;
		query(
			`
			UPDATE posts SET image_url=?, title=?, body=?, excerpt=?, slug=?, visibility=?
			WHERE blog_id = (
				SELECT id
				FROM blogs
				WHERE slug = ?
			) AND slug = ?;`,
			[post.image_url, post.title, post.body, post.excerpt, post.slug, post.visibility, post.blog_slug, post.slug]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function deletePost(req: Request, res: Response) {
	try {
		//TODO
		res.sendStatus(200);
		// TODO borrar imagenes relacionadas con ese post
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
