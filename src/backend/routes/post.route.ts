import { Router } from "express";
import { deletePost, getPost, getPosts, savePost, updatePost } from "../services/post.service.js";

const postRouter = Router();

// prettier-ignore
postRouter.route("/post")
	.get(getPosts)
	.post(savePost);

// prettier-ignore
postRouter.route("/post/:id")
	.get(getPost)
	.patch(updatePost)
	.delete(deletePost);

export default postRouter;
