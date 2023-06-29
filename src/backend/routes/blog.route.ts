import { Router } from "express";
import { getBlogs } from "../services/blog.service.ts";

const blogRouter = Router();

blogRouter.route("/blog").get(getBlogs);

export default blogRouter;
