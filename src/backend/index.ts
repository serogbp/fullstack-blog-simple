import express from "express";
import config from "./env.js";
import cors from "cors";
import tagRouter from "./routes/tag.route.ts";
import blogRouter from "./routes/blog.route.ts";
import credentialsRouter from "./routes/credentials.route.ts";
import userRouter from "./routes/user.route.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/image", express.static("./public/image"));

app.use("/", blogRouter);
app.use("/", userRouter);
app.use("/", tagRouter);
app.use("/", credentialsRouter);

app.listen(config.port, () => {
	console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
