import express from "express";
import config from "./env.js";
import cors from "cors";
import connect from "./database/mysql.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/post", async (req, res) => {
	const connection = await connect();

	const [rows, fields] = await connection.query("SELECT * FROM posts");
	connection.end();

	console.log(rows);
});

app.listen(config.port, () => {
	console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
