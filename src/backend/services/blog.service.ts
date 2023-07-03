import { Request, Response } from "express";
import { query } from "./db.service.ts";
import { Post } from "../../common/interfaces.ts";
import { deleteImageFromServer } from "../multer/uploadImage.ts";

interface PostCount {
	total_posts: number;
}

export async function getPostsCount(req: Request, res: Response) {
	try {
		const [rows] = await query(
			`
			SELECT COUNT(*) AS total_posts
			FROM posts;
		`
		);
		const result = rows as PostCount[];

		res.status(200).json(result[0].total_posts);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

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
		const [rows] = await query(
			`
		SELECT *
		FROM posts
		WHERE slug = ?;
		`,
			[req.params.post_slug]
		);
		const result = rows as Post[];
		res.status(200).json(result[0]);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function createPost(req: Request, res: Response) {
	try {
		const post = req.body;
		await query(
			`
		INSERT INTO posts (image_url, title, body, excerpt, slug) VALUES (?, ?, ?, ?, ?);`,
			[post.image_url, post.title, post.body, post.excerpt, post.slug]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function updatePost(req: Request, res: Response) {
	try {
		const post = req.body;

		// Si se cambia la imagen, borrar del servidor la antigua
		if (post.image_url !== "") {
			deletePostImage(post.slug);
		}

		await query(
			`
			UPDATE posts SET image_url=?, title=?, body=?, excerpt=COALESCE(NULLIF(?, ""), ""), slug=?
			WHERE slug = ?;`,
			[post.image_url, post.title, post.body, post.excerpt, post.slug, post.original_slug ?? post.slug]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function deletePost(req: Request, res: Response) {
	try {
		await deletePostImage(req.params.post_slug);

		await query(
			`DELETE FROM posts
			WHERE slug = ?;
		`,
			[req.params.post_slug]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function deletePostImage(post_slug: string) {
	try {
		const [rows] = await query(
			`
			SELECT image_url
			FROM posts
			WHERE slug = ?;
			`,
			[post_slug]
		);
		const result = rows as { image_url: string }[];
		const image_url = result[0].image_url;
		deleteImageFromServer(image_url);
	} catch (error) {
		console.log(error);
	}
}
