import { Router } from "express";
import { login, signIn } from "../services/credentials.service.ts";

const credentialsRouter = Router();

credentialsRouter.route("/login").post(login);
credentialsRouter.route("/sign-in").post(signIn);

export default credentialsRouter;
