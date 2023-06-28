import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
