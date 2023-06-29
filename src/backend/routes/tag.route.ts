import { Router } from "express";
import { getTags, getPostsByTag } from "../services/tag.service.ts";

const tagRouter = Router();

tagRouter.route("/tag").get(getTags);
tagRouter.route("/tag/:id").get(getPostsByTag);

export default tagRouter;
