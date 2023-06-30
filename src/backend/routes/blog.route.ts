import { Router } from "express";
import { createBlog, createPost, deletePost, getBlogs, getPost, getPosts, updatePost } from "../services/blog.service.ts";

const blogRouter = Router();

// prettier-ignore
blogRouter.route("/blog")
.get(getBlogs)
.post(createBlog);

blogRouter.route("/blog/:blog_slug").get(getPosts);

blogRouter.route("/blog/:blog_slug/post").post(createPost);

// prettier-ignore
blogRouter.route("/blog/:blog_slug/post/:post_slug")
	.get(getPost)
	.patch(updatePost)
	.delete(deletePost);

export default blogRouter;
