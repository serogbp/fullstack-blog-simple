import { API_IMAGE } from "../services/api";

export function getImageUrl(url: string, title: string) {
	let image_url = "";
	if (url === "") {
		const length = 30;
		const image_title = title.length > length ? title.substring(0, length) + "..." : title;
		image_url = `https://placehold.co/600x400?text=${image_title}`;
	} else {
		image_url = API_IMAGE + url;
	}

	return image_url;
}
