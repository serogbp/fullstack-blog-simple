import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// const destinationPath = path.join(__dirname, "../public/image/");
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
