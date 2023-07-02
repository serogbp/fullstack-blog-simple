import express from "express";
import config from "./env.js";
import cors from "cors";
import blogRouter from "./routes/blog.route.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("/"));
const url = new URL("./public/image", import.meta.url);
const imagePath = url.pathname.substring(1);
app.use("/image", express.static(imagePath));

app.use("/", blogRouter);

app.listen(config.port, () => {
	console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
