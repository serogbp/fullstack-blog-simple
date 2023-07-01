import { Router } from "express";
import { createBlog, getBlogsFromUsername, getUser } from "../services/user.service.ts";

const userRouter = Router();

// prettier-ignore
userRouter.route("/user/:username")
	.get(getUser)

// prettier-ignore
userRouter.route("/user/:username/blog")
	.get(getBlogsFromUsername)
	.post(createBlog);

export default userRouter;
