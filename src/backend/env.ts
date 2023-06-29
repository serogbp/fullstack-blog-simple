import dotenv from "dotenv";
import { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

export interface Config {
	port: string | undefined;
	database: {
		host: string | undefined;
		user: string | undefined;
		password: string | undefined;
		database: string | undefined;
	};
	jwt_token: Secret | GetPublicKeyOrSecret;
}

dotenv.config();

const config: Config = {
	port: process.env.PORT,
	database: {
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	},
	jwt_token: process.env.JWT_TOKEN ?? "",
};

export default config;
