import { Request, Response } from "express";
import { query } from "./db.service.ts";

export async function getBlogs(req: Request, res: Response) {
	try {
		//TODO paginacion?
		const [rows] = await query("SELECT * FROM blogs");
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
