import { DateTime } from "luxon";
import { Post } from "../../../common/interfaces";
import Card from "./Card";
import { API_IMAGE } from "../services/api";

interface Props {
	post: Post;
}

export default function CardPost(props: Props) {
	return (
		<Card>
			{props.post.image_url && <img className="h-64 rounded-lg object-cover" src={API_IMAGE + props.post.image_url} alt="" />}
			<h2 className="mb-2 text-xl font-semibold">{props.post.title}</h2>
			<p className="text-sm text-stone-400">{DateTime.fromISO(props.post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
			<p>{props.post.excerpt}</p>
		</Card>
	);
}
