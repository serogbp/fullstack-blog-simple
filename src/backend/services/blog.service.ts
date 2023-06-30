import { Request, Response } from "express";
import { query } from "./db.service.ts";
import { Blog, Post } from "../../common/interfaces.ts";

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

export async function createBlog(req: Request, res: Response) {
	const blog = req.body as Blog;
	try {
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

export async function getPosts(req: Request, res: Response) {
	const blog_slug = req.params.blog_slug;
	try {
		const [rows] = await query(
			`
		SELECT p.*
		FROM posts p
		JOIN blogs b ON p.blog_id = b.id
		WHERE b.slug = ?;
		`,
			[blog_slug]
		);
		// TODO paginacion?
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function getPost(req: Request, res: Response) {
	try {
		const [rows] = await query(
			`
		SELECT p.*
		FROM posts p
		JOIN blogs b ON p.blog_id = b.id
		WHERE b.slug = ? AND p.slug = ?;

		`,
			[req.params.blog_slug, req.params.post_slug]
		);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function createPost(req: Request, res: Response) {
	const post: Post = req.body;
	// TODO guardar tags
	// req.body.post y req.body.tags
	try {
		await query(
			`
			INSERT INTO posts (blog_id, image_url, title, body, excerpt, slug, visibility) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[post.blog_id, post.image_url, post.title, post.body, post.excerpt, post.slug, post.visibility]
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
			UPDATE posts SET image_url=?, title=?, body=?, excerpt=?, slug=?, visibility=? WHERE id=?`,
			[post.image_url, post.title, post.body, post.excerpt, post.slug, post.visibility, post.id]
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
