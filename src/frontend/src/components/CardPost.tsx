import { DateTime } from "luxon";
import { Post } from "../../../common/interfaces";
import Card from "./Card";

interface Props {
	post: Post;
}

export default function CardPost(props: Props) {
	return (
		<Card>
			<h2 className="mb-2 text-xl font-semibold">{props.post.title}</h2>
			<p className="text-sm text-stone-400">{DateTime.fromISO(props.post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
			<p>{props.post.excerpt}</p>
		</Card>
	);
}
