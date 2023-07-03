import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// CommonJS
		// const destinationPath = path.join(__dirname, "../public/image/");
		// ES Modules
		const url = new URL("../public/image", import.meta.url);
		cb(null, url.pathname.substring(1));
	},
	filename: (req, file, cb) => {
		console.log(file);
		const imageExtension = file.mimetype.split("/")[1];
		const filename = Date.now() + "-" + file.originalname + "." + imageExtension;
		cb(null, filename);
		req.body.image_url = filename;
	},
});
const uploadImage = multer({ storage });

export default uploadImage;

export function deleteImageFromServer(filename: string) {
	const url = new URL("../public/image", import.meta.url);
	const folder = url.pathname.substring(1);
	fs.unlink(`${folder}/${filename}`, (err) => {
		if (err) {
			console.log(err);
		}
	});
}
