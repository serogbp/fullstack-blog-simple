import { Router } from "express";
import { createPost, deletePost, getBlog, getBlogs, getPost, getPosts, updatePost } from "../services/blog.service.ts";
import { getToken } from "../middlewares/jwt.middleware.ts";

const blogRouter = Router();

// prettier-ignore
blogRouter.route("/blog")
	.get(getBlogs)

blogRouter.route("/blog/:blog_slug").get(getBlog);

// prettier-ignore
blogRouter.route("/blog/:blog_slug/post")
	.get(getPosts)
	.post(createPost);

// prettier-ignore
blogRouter.route("/blog/:blog_slug/post/:post_slug")
	// TODO revisar
	// @ts-ignore
	.get(getToken, getPost)
	// TODO comprobar que es owner como en getPost
	.post(createPost)
	// TODO comprobar que es owner como en getPost
	.patch(updatePost)
	// TODO comprobar que es owner como en getPost
	.delete(deletePost);

export default blogRouter;
