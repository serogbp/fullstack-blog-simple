import mysql from "mysql2/promise";
import config from "../env.js";

function connect() {
	return mysql.createConnection({
		host: config.database.host,
		user: config.database.user,
		password: config.database.password,
		database: config.database.database,
	});
}

export async function query(sql: string, params?: any[]) {
	const connection = await connect();
	const [rows, fields] = await connection.query(sql, params);
	connection.end();
	return [rows, fields];
}
