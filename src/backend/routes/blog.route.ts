import { Router } from "express";
import { getBlogs, getPosts } from "../services/blog.service.ts";

const blogRouter = Router();

blogRouter.route("/blog").get(getBlogs);
blogRouter.route("/blog/:id").get(getPosts);

export default blogRouter;
