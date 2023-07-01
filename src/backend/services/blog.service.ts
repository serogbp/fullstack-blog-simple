import { NextFunction, Request, Response } from "express";
import { query } from "./db.service.ts";
import { Blog, Post, Token } from "../../common/interfaces.ts";
import { MyRequest } from "../interfaces-backend.ts";

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

export async function getBlog(req: Request, res: Response) {
	try {
		const blog_slug = req.params.blog_slug;
		const [rows] = await query(
			`
		SELECT *
		FROM blogs
		WHERE slug = ?;
		`,
			[blog_slug]
		);
		const blogs = rows as Blog[];
		res.send(blogs[0]);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

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

export async function getPost(req: MyRequest, res: Response) {
	try {
		//TODO optimizacion Promise.All
		// Guardar la query en variable, si el token no es nulo, lanzar la query y isBlogOwner en un Promise.All
		const [rows] = await query(
			`
		SELECT p.*
		FROM posts p
		JOIN blogs b ON p.blog_id = b.id
		WHERE b.slug = ? AND p.slug = ?;

		`,
			[req.params.blog_slug, req.params.post_slug]
		);
		const posts = rows as Post[];
		const post = posts[0];

		const token = req.decoded as Token;

		const isOwner = token ? await isBlogOwner(token.id, req.params.blog_slug, post.id ?? "") : false;

		const response = {
			post: post,
			isOwner: isOwner,
		};
		res.send(response);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function createPost(req: Request, res: Response) {
	// TODO comprobar que existe el blog antes de la inserción
	// TODO obtener blog_id a partir del body.blog_slug

	// TODO guardar tags
	// req.body.post y req.body.tags
	try {
		const { blog_slug, post } = req.body;
		const blog_id = await getBlogId(blog_slug);
		await query(
			`
			INSERT INTO posts (blog_id, image_url, title, body, excerpt, slug, visibility) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[blog_id, post.image_url, post.title, post.body, post.excerpt, post.slug, post.visibility]
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
		const { blog_slug, post_slug } = req.body;
		await query(
			`
		DELETE FROM posts
		WHERE id IN (
			SELECT p.id
			FROM posts p
			JOIN blogs b ON p.blog_id = b.id
			WHERE b.slug = ? AND p.slug = ?
		);
		`,
			[blog_slug, post_slug]
		);
		res.sendStatus(200);
		// TODO borrar imagenes relacionadas con ese post
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function isBlogOwner(user_id: string, blog_slug: string, post_id: string) {
	try {
		const [rows] = await query(
			`
		SELECT b.user_id
		FROM blogs b
		JOIN posts p ON b.id = p.blog_id
		WHERE p.id = ? AND b.slug = ? AND b.user_id = ?;
		`,
			[post_id, blog_slug, user_id]
		);

		return Array.isArray(rows) && rows.length > 0;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function getBlogId(blog_slug: string) {
	try {
		const [rows] = await query(
			`
		SELECT id
		FROM blogs
		WHERE slug = ?;
		`,
			[blog_slug]
		);
		return (rows as Blog[])[0].id;
	} catch (error) {
		console.log(error);
		return null;
	}
}
