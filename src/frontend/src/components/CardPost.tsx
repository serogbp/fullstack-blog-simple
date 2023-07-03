import { DateTime } from "luxon";
import { Post } from "../../../common/interfaces";
import Card from "./Card";
import { API_IMAGE } from "../services/api";

interface Props {
	post: Post;
}

export default function CardPost(props: Props) {
	const post = props.post as Post;

	let excerpt = "";

	if (!post.excerpt || post.excerpt === "") {
		excerpt = post.body.length > 50 ? post.body.substring(0, 50) + "..." : post.body;
	} else {
		excerpt = post.excerpt.length > 50 ? post.excerpt.substring(0, 50) + "..." : post.excerpt;
	}

	return (
		<Card>
			{post.image_url && <img className="h-64 rounded-lg object-cover" src={API_IMAGE + post.image_url} alt="" />}
			<h2 className="mb-2 break-all text-xl font-semibold">{post.title}</h2>
			<p className="text-sm text-stone-400">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
			<p>{excerpt}</p>
		</Card>
	);
}
