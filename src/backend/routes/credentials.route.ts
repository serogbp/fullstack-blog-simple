import { Router } from "express";
import { login, register } from "../services/credentials.service";

const userRouter = Router();

userRouter.route("/login").post(login);
userRouter.route("/register").post(register);

export default userRouter;
