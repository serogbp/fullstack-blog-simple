import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, getPostsCount, updatePost } from "../services/blog.service.ts";
import uploadImage from "../multer/uploadImage.ts";

const blogRouter = Router();

blogRouter.route("/post/count").get(getPostsCount);

blogRouter
	.route("/post/")
	/*
	example: http://localhost:3001/post?itemsPerPage=5&page=1
	- itemsPerPage
	- page
	*/
	.get(getPosts)
	.post(uploadImage.single("image"), createPost);

// prettier-ignore
blogRouter.route("/post/:post_slug")
	.get(getPost)
	.patch(uploadImage.single("image"),updatePost)
	.delete(deletePost);

export default blogRouter;
