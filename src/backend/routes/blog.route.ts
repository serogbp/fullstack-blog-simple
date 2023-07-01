import { Router } from "express";
import { createBlog, createPost, deletePost, getBlogs, getPost, getPosts, updatePost } from "../services/blog.service.ts";
import { getToken } from "../middlewares/jwt.middleware.ts";

const blogRouter = Router();

// prettier-ignore
blogRouter.route("/blog")
	.get(getBlogs)
	.post(createBlog);

// prettier-ignore
blogRouter.route("/blog/:blog_slug")
	.get(getPosts)
	.post(createPost);

// prettier-ignore
blogRouter.route("/blog/:blog_slug/post/:post_slug")
	// TODO revisar
	// @ts-ignore
	.get(getToken, getPost)
	// TODO comprobar que es owner
	.patch(updatePost)
	// TODO comprobar que es owner
	.delete(deletePost);

export default blogRouter;
