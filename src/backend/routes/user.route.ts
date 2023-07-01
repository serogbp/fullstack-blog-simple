import { Router } from "express";
import { createBlog, getBlogsFromUsername, getUser, getUserLoggedIn } from "../services/user.service.ts";
import { getToken } from "../middlewares/jwt.middleware.ts";

const userRouter = Router();

// prettier-ignore
userRouter.route("/user/logged-in")
	// @ts-ignore
	// TODO solucionar ts-ignore
	.get(getToken, getUserLoggedIn)

// prettier-ignore
userRouter.route("/user/:username")
	.get(getUser)

// prettier-ignore
userRouter.route("/user/:username/blog")
	.get(getBlogsFromUsername)
	.post(createBlog);

export default userRouter;
