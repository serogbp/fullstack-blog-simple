import mysql from "mysql2/promise";
import config from "../env.js";

export default function connect() {
	return mysql.createConnection({
		host: config.database.host,
		user: config.database.user,
		password: config.database.password,
		database: config.database.database,
	});
}
