import express from "express";
import config from "./env.js";
import cors from "cors";
import connect from "./database/mysql.js";
import postRouter from "./routes/post.route.ts";
import tagRouter from "./routes/tag.route.ts";
import blogRouter from "./routes/blog.route.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", postRouter);
app.use("/", blogRouter);
app.use("/", tagRouter);

app.listen(config.port, () => {
	console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
